const { categories, products } = require('../menu-data.js');

const model = 'openai/gpt-oss-20b';
const productIds = new Set(products.map(({ id }) => id));
const catalog = products.map(({ id, name, categoryId, description, aci, price, bir, birbucuk }) => {
    const category = categories.find((item) => item.id === categoryId).name;
    const singlePrice = price || ['Tatlı', 'İçecek'].includes(categoryId);
    const prices = singlePrice
        ? { adet: Number(price || bir) }
        : { birPorsiyon: Number(bir) };
    if (!singlePrice && Number(birbucuk) > 0) prices.birBucukPorsiyon = Number(birbucuk);

    return { id, name, category, description, aci: aci || 'belirtilmemiş', prices };
});

const instructions = `Urfa Sofrası'nın Türkçe menü asistanısın. Yalnızca aşağıdaki güncel menü hakkında
kısa, doğal yanıtlar ver. Kullanıcının önceki sorularını ve önceki önerilerde listelenen ürünleri dikkate al.
Menü dışında bir şey sorulursa, menü hakkında yardımcı olabileceğini söyle.

Kurallar:
- Yalnızca menüdeki ürünleri ve açıkça verilen bilgileri kullan. Stok, tarifteki bilinmeyen malzemeler,
  alerjen güvenliği veya özel hazırlama istekleri için personele danışılmasını söyle.
- Fiyatlar TL cinsinden. "Bir porsiyon" ve "bir buçuk porsiyon" fiyatlarını karıştırma.
  İstenen porsiyonun fiyatı yoksa bunu söyle. "Uygun fiyatlı" önerilerde ilgili kategoriyi ve porsiyonu
  dikkate al. Boru Kebabı en az 3 porsiyon hazırlanır. İstenen bir toplamı hesaplarken bunu belirt.
- Acı durumu ana ürün içindir. Yanında gelen közlenmiş biber veya ezmenin acı seviyesini tahmin etme.
  Isotlu ürünlerde acılık derecesini ancak menü belirtiyorsa söyle. Az acılı seçeneği ile tamamen
  acısız hazırlama seçeneğini karıştırma. Özel hazırlama seçeneğini ancak menü belirtiyorsa öner.
- Acısız istenirse sadece acı durumu "acısız" olan yemekleri öner. Çok acılı bir ürünü ancak veri
  açıkça belirtiyorsa öner.
- reply düz metin olsun. Önerdiğin veya hakkında bilgi verdiğin ürünleri productIds alanında menüdeki
  numaralarıyla ver. Menüde bulunmayan ürünler için bu alanı boş bırak. En fazla 8 farklı ürün seç.
  Sonraki soruda "bunların" denirse önceki öneriler arasından seç.

Menü:
${JSON.stringify(catalog)}`;

const responseFormat = {
    type: 'json_schema',
    json_schema: {
        name: 'menu_response',
        strict: true,
        schema: {
            type: 'object',
            properties: {
                reply: { type: 'string' },
                productIds: { type: 'array', items: { type: 'integer' } },
            },
            required: ['reply', 'productIds'],
            additionalProperties: false,
        },
    },
};

function parseMessages(body) {
    const messages = body?.messages;
    if (!Array.isArray(messages) || messages.length < 1 || messages.length > 7 || messages.length % 2 === 0) {
        return null;
    }

    const valid = messages.every((message, index) => {
        const role = index % 2 === 0 ? 'user' : 'assistant';
        const limit = role === 'user' ? 500 : 1600;
        return message?.role === role && typeof message.content === 'string'
            && message.content.length <= limit && message.content.trim();
    });
    return valid ? messages.map(({ role, content }) => ({ role, content: content.trim() })) : null;
}

module.exports = async function chat(request, response) {
    response.setHeader('Cache-Control', 'no-store');
    if (request.method !== 'POST') {
        response.setHeader('Allow', 'POST');
        return response.status(405).json({ error: 'Yalnızca POST isteği kabul edilir.' });
    }
    if (!/^application\/json(?:\s*;|$)/i.test(request.headers['content-type'] || '')) {
        return response.status(415).json({ error: 'JSON isteği bekleniyor.' });
    }
    if (Number(request.headers['content-length']) > 24000) {
        return response.status(413).json({ error: 'Mesaj çok uzun.' });
    }

    let messages;
    try {
        const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
        messages = parseMessages(body);
    } catch {
        return response.status(400).json({ error: 'Geçersiz istek.' });
    }
    if (!messages) return response.status(400).json({ error: 'Geçersiz sohbet mesajı.' });

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        return response.status(503).json({ error: 'Sohbet şu anda kullanılamıyor.' });
    }

    try {
        const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                messages: [{ role: 'system', content: instructions }, ...messages],
                response_format: responseFormat,
                reasoning_effort: 'low',
                max_completion_tokens: 950,
            }),
            signal: AbortSignal.timeout(12000),
        });

        if (upstream.status === 429) {
            return response.status(429).json({ error: 'Sohbet şu an yoğun. Biraz sonra tekrar deneyebilirsin.' });
        }
        if (!upstream.ok) throw new Error(`Groq HTTP ${upstream.status}`);

        const data = await upstream.json();
        const result = JSON.parse(data.choices?.[0]?.message?.content);
        const reply = result.reply?.trim();
        if (!reply || reply.length > 1200 || !Array.isArray(result.productIds)) {
            throw new Error('Invalid Groq response');
        }

        const ids = [...new Set(result.productIds.filter((id) => productIds.has(id)))].slice(0, 8);
        return response.status(200).json({ reply, productIds: ids });
    } catch (error) {
        console.error('Menu chat:', error.name, error.message.startsWith('Groq HTTP') ? error.message : '');
        return response.status(502).json({ error: 'Sohbet yanıt veremedi. Biraz sonra tekrar deneyebilirsin.' });
    }
};
