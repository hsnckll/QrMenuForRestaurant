const { categories, products } = require('../menu-data.js');

const model = 'openai/gpt-oss-120b';
const productIds = new Set(products.map(({ id }) => id));
const grillSides = 'Közlenmiş biber ve domates, bulgur pilavı, ezme ve haydariyle servis edilir.';
const wrapSides = 'Közlenmiş biber, ezme ve haydariyle servis edilir.';
const heatReplies = {
    'acısız': 'acısız hazırlanıyor.',
    'az acılı': 'hafif acılı bir terbiyeyle hazırlanıyor.',
    'acılı, az acılı seçeneği var': 'acılı hazırlanıyor. Daha hafif seviyorsan az acılı seçeneği de var.',
    'terbiyesinde acı var': 'acı kullanılan bir terbiyeyle hazırlanıyor. Menüde acının derecesi belirtilmiyor.',
    'isotlu': 'isotla pişiriliyor. Menüde acının derecesi belirtilmiyor.',
};
const ayran = products.find(({ name }) => name === 'Ayran');
const yayikAyran = products.find(({ name }) => name === 'Yayık Ayran');
const productList = new Intl.ListFormat('tr', { style: 'long', type: 'conjunction' });
const heatGroups = [
    ['acılı, az acılı seçeneği var', 'için acılı ve az acılı seçenek var.'],
    ['az acılı', 'hafif acılı terbiyeyle hazırlanıyor.'],
    ['terbiyesinde acı var', 'hazırlanırken terbiyesine acı ekleniyor.'],
    ['isotlu', 'isotla pişiriliyor. Acı derecesi menüde belirtilmiyor.'],
];
const catalog = products.map(({ id, name, categoryId, description, aci, price, bir, birbucuk }) => {
    const category = categories.find((item) => item.id === categoryId).name;
    const singlePrice = price || ['Tatlı', 'İçecek'].includes(categoryId);
    const prices = singlePrice
        ? { adet: Number(price || bir) }
        : { birPorsiyon: Number(bir) };
    if (!singlePrice && Number(birbucuk) > 0) prices.birBucukPorsiyon = Number(birbucuk);

    const shortDescription = description.replace(grillSides, '[G]').replace(wrapSides, '[D]');
    const heat = aci === 'isotlu' ? 'isotla pişirilir, acı derecesi belirtilmemiş' : aci || 'belirtilmemiş';
    return [id, name, category, shortDescription, heat, prices];
});

const instructions = `Urfa Sofrası'nda misafirle konuşur gibi, samimi ve doğal Türkçe kullan.
Misafirin sorusuna günlük konuşma diliyle cevap ver. Ürünleri kuru kuruya sıralamak yerine hangisinin
ona uyacağını, nedenini ve aralarındaki farkı söyle. Detay istenirse porsiyon, servis ve acı bilgisini
menüden alıp açıklayabilirsin. Genel liste istendiğinde tek ürünle yetinme.
Misafir bir yemeği merak ediyorsa ya da ne yemesi gerektiğini soruyorsa, menüden bir ayrıntı ver ve yanına
bir eşlikçi öner. Bunun için "Yanına ne gider?" diye ayrıca sormasını bekleme. İçecek, tatlı veya alternatif
seçimini yemeğe göre yap ve neden yakıştığını bir cümleyle söyle. Tek bir ek öneri yeterli.
Öneriyi soruya göre değiştir. Misafirin bütçesine ve damak tadına uy, istemediği bir şeyi tekrar önerme.
Yalnızca fiyat sorulduğunda fiyatı hemen ver. "Başka ne var?" gibi kısa takip sorularında önceki isteğin
konusunu ve tercihlerini sürdür. Örneğin acılı yemek konuşuluyorsa hafif acılı tavuk şiş, kanat ve tavuk
dürümü de düşün. Önceki kartları alternatifmiş gibi tekrar önerme.
Menü dışında bir şey sorulursa, menü hakkında yardımcı olabileceğini söyle.

Örnek soru: "Adana kebap nasıl, önerir misin?"
Örnek reply: "Acılı kebap seviyorsan Adana kebabımızı öneririm. Yanında bulgur pilavı, ezme ve haydari geliyor.
Acıya serin bir eşlikçi istersen köpüklü yayık ayranımız güzel gider."
Örnek productIds: [2, 23]

Kurallar:
- Menüdeki ürünlerden kendi eşleştirmelerini yapabilirsin. "Yanına güzel gider" gibi bir öneri sun.
  Satış, popülerlik, stok veya menüde olmayan malzemeler hakkında bilgi uydurma. Hangi yemeklerin
  çok satıldığı veya misafirlerin genelde ne yediği sorulursa satış bilgisi olmadığını söyle ve
  varsa kendi önerini damak tadına göre sun. "Genelde tercih ediliyor" deme.
  Garnitürleri aşağıda listelendiği gibi ayrı ayrı an. Bulgur pilavına biber veya domates eklendiğini söyleme.
  Karşılaştırmada parça boyutu, yumuşaklık veya acı farkı hakkında tahmin yürütme. Örneğin "İkisi de hafif
  acılı terbiyeyle hazırlanıyor. Tavuk şişte tavuk parçaları şişte pişiyor, kanat ise ızgarada kızartılıyor."
  Alerjen güvenliği veya menüde belirtilmeyen özel hazırlama istekleri için personele yönlendir.
- Fiyatlar TL cinsinden. "Bir porsiyon" ve "bir buçuk porsiyon" fiyatlarını karıştırma.
  İstenen porsiyonun fiyatı yoksa bunu söyle. "Uygun fiyatlı" önerilerde ilgili kategoriyi ve porsiyonu
  dikkate al. Boru Kebabı en az 3 porsiyon hazırlanır. İstenen bir toplamı hesaplarken bunu belirt.
- Acı durumu ana ürün içindir. Yanında gelen közlenmiş biber veya ezmenin acı seviyesini tahmin etme.
  Isotla pişirilen ürünü asla acısız olarak tanımlama. Acılığı sorulursa "İsotla pişiriliyor,
  acı derecesi belirtilmemiş." de. Az acılı seçeneği ile tamamen
  acısız hazırlama seçeneğini karıştırma. Menüde seçenek varsa aynen belirt. Acının isteğe göre
  ayarlanabildiğini veya menüde olmayan başka bir hazırlama seçeneğini söyleme.
- Acısız istenirse sadece acı durumu "acısız" olan yemekleri öner. Çok acılı bir ürünü ancak veri
  açıkça belirtiyorsa öner.
- reply düz metin olsun. Ana yemek ve yanında önerdiğin ürünü productIds alanına menü numaralarıyla
  ekle. Ürün numaralarını müşteriye gösterilen reply metnine yazma.
  Menüde bulunmayan ürünler için bu alanı boş bırak. Genel liste istenirse ilgili ürünleri atlama.
  Sonraki soruda "bunların" denirse önceki öneriler arasından seç.

Menü satırları sırasıyla ürün numarası, ad, kategori, açıklama, acı durumu ve fiyatları içerir.
[G] Ayrı garnitürler: köz biber, köz domates, bulgur pilavı, ezme, haydari.
[D] Ayrı garnitürler: köz biber, ezme, haydari.

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

function normalizedName(value) {
    return value.toLocaleLowerCase('tr').normalize('NFD').replace(/\p{M}/gu, '').replaceAll('ı', 'i');
}

function productName(product) {
    return product.name.split(' (')[0];
}

function findDirectHeatQuestion(question) {
    const match = normalizedName(question.trim()).match(/^(.+?)\s+(?:acili|acisiz|aci)\s+m[ui][?.!]*$/);
    if (!match) return null;

    const name = ['adana', 'urfa'].includes(match[1]) ? `${match[1]} kebap` : match[1];
    return products.find((product) => product.aci && normalizedName(productName(product)) === name);
}

function directHeatReply(product, messages) {
    const name = productName(product);
    const drink = product.categoryId === 'Dürüm' ? ayran : yayikAyran;
    const alreadyMentioned = messages.slice(0, -1).some(({ content }) =>
        normalizedName(content).includes('ayran'));
    const reply = `${name} ${heatReplies[product.aci]}`;
    if (!drink || alreadyMentioned) return { reply, productIds: [product.id] };

    const pairing = drink === yayikAyran
        ? 'Yanına köpüklü yayık ayranımız güzel gider.'
        : 'Dürümün yanına serin bir ayran iyi gider.';
    return { reply: `${reply} ${pairing}`, productIds: [product.id, drink.id] };
}

function isAnotherQuestion(question) {
    const q = normalizedName(question).replace(/[?.!]+$/g, '').trim();
    return /^(?:peki )?(?:baska(?: (?:ne var|ne onerirsin|neler var|bir sey var mi|oner))?|daha ne var)$/.test(q);
}

function heatOverview(question) {
    const q = normalizedName(question).replace(/[?.!]+$/g, '').trim();
    const heat = q.match(/^(?:(az|hafif|cok) )?ac(?:ili|i)(?:\s*(?:ne|na) var|(?: yemek(?:ler)?| secenek(?:ler)?| izgara(?:lar)?| durum(?:ler)?)?(?: ne var| neler var| neler| var mi| oner(?:ir misin)?| tavsiye eder misin| istiyorum))$/);
    if (!heat) return null;

    const category = /\bdurum/.test(q) ? 'Dürüm' : /\bizgara/.test(q) ? 'Izgara' : null;
    return { level: heat[1], category };
}

function heatRecommendations(messages) {
    const questions = messages.filter(({ role }) => role === 'user').map(({ content }) => content);
    const current = questions.at(-1);
    const isFollowup = isAnotherQuestion(current);
    const topic = isFollowup
        ? questions.slice(0, -1).findLast((question) => !isAnotherQuestion(question))
        : current;
    const direct = isFollowup && topic && findDirectHeatQuestion(topic);
    const overview = (topic && heatOverview(topic)) || (direct?.aci && direct.aci !== 'acısız' ? {} : null);
    if (!overview) return null;

    const { level, category } = overview;
    const mild = level === 'az' || level === 'hafif';
    const groups = heatGroups.map(([heat, sentence]) => ({
        sentence,
        options: products.filter((product) => product.aci === heat && (!category || product.categoryId === category)),
    }));
    const matching = mild ? groups.slice(0, 2).reverse() : groups;
    const lastAnswer = messages.at(-2)?.content || '';
    const listed = lastAnswer.split('\nListelenen ürünler: ').at(1)?.replace(/\.$/, '').split(', ');
    const unshown = isFollowup
        ? matching.map(({ sentence, options }) => ({
            sentence,
            options: options.filter((product) => product.id !== direct?.id &&
                !(listed ? listed.includes(product.name) : normalizedName(lastAnswer).includes(normalizedName(productName(product))))),
        }))
        : matching;

    if (isFollowup && !unshown.some(({ options }) => options.length)) {
        const mildOptions = groups[1].options;
        const names = productList.format(mildOptions.map(productName));
        return {
            reply: `Acılı seçenekler bunlar. Acıyı hafif tutmak istiyorsan ${names} arasından seçebilirsin.`,
            productIds: mildOptions.map(({ id }) => id),
        };
    }

    const sentences = unshown
        .filter(({ options }) => options.length)
        .map(({ sentence, options }) => `${productList.format(options.map(productName))} ${sentence}`);
    if (level === 'cok') sentences.unshift('Menüde çok acılı olarak belirtilen bir yemek yok.');
    else if (sentences.length > 1) {
        sentences.unshift(isFollowup ? 'Bunların dışında şunlar da var.' : 'Ne kadar acı sevdiğine göre birkaç seçenek var.');
    }
    return {
        reply: sentences.join('\n'),
        productIds: unshown.flatMap(({ options }) => options.map(({ id }) => id)),
    };
}

function popularityReply(question) {
    const q = normalizedName(question);
    if (!/en cok|en populer|\bmusteri|\bgelen\b|\bgelenler\b/.test(q) ||
        !/ne yi|ne ye|tercih|satiliyor|populer|satiyor|siparis/.test(q)) return null;

    const adana = products.find((product) => productName(product) === 'Adana Kebap');
    const urfa = products.find((product) => productName(product) === 'Urfa Kebap');
    return {
        reply: 'En çok ne sipariş edildiğine dair bir bilgim yok. Acılı kebap seviyorsan Adana iyi gider. Acısız bir kebap istersen Urfa’yı öneririm.',
        productIds: [adana?.id, urfa?.id].filter(Boolean),
    };
}

function removeProductNumbers(reply) {
    for (const { id, name } of products) {
        const label = name.split(' (')[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const numberedName = new RegExp(`(${label}(?:\\s*\\(\\d+\\s*g(?:r)?\\))?)\\s*\\((?:id\\s*)?${id}\\)`, 'giu');
        reply = reply.replace(numberedName, '$1');
    }
    return reply;
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

    const question = messages.at(-1).content;
    const menuReply = heatRecommendations(messages) || popularityReply(question);
    if (menuReply) return response.status(200).json(menuReply);

    const heatProduct = findDirectHeatQuestion(question);
    if (heatProduct && heatReplies[heatProduct.aci]) {
        return response.status(200).json(directHeatReply(heatProduct, messages));
    }

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
        const reply = typeof result.reply === 'string' ? removeProductNumbers(result.reply).trim() : '';
        if (!reply || reply.length > 1200 || !Array.isArray(result.productIds)) {
            throw new Error('Invalid Groq response');
        }

        const ids = [...new Set(result.productIds.filter((id) => productIds.has(id)))].slice(0, 8);
        if (!ids.length) {
            const question = messages.at(-1).content.toLocaleLowerCase('tr');
            const answer = reply.toLocaleLowerCase('tr');
            const mentioned = products
                .map(({ id, name }) => ({ id, name: name.split(' (')[0].toLocaleLowerCase('tr') }))
                .filter(({ name }) => question.includes(name) && answer.includes(name))
                .sort((first, second) => second.name.length - first.name.length)[0];
            if (mentioned) ids.push(mentioned.id);
        }
        return response.status(200).json({ reply, productIds: ids });
    } catch (error) {
        console.error('Menu chat:', error.name, error.message.startsWith('Groq HTTP') ? error.message : '');
        return response.status(502).json({ error: 'Sohbet yanıt veremedi. Biraz sonra tekrar deneyebilirsin.' });
    }
};
