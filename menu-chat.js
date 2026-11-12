(() => {
    const dialog = document.getElementById('menuChat');
    const launch = document.getElementById('menuChatLaunch');
    const close = document.getElementById('menuChatClose');
    const form = document.getElementById('menuChatForm');
    const input = document.getElementById('menuChatInput');
    const send = document.getElementById('menuChatSend');
    const suggestions = document.getElementById('menuChatSuggestions');
    const body = document.getElementById('menuChatBody');
    const messages = document.getElementById('menuChatMessages');
    const status = document.getElementById('menuChatStatus');
    const currency = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
    });
    const history = [];
    let pending = false;

    launch.addEventListener('click', () => dialog.showModal());
    close.addEventListener('click', () => dialog.close());

    function scrollToLatest() {
        body.scrollTop = body.scrollHeight;
    }

    function addMessage(text, role) {
        const bubble = document.createElement('p');
        bubble.className = `menu-chat-bubble menu-chat-${role}`;
        bubble.textContent = text;
        messages.append(bubble);
        return bubble;
    }

    function addProducts(productIds) {
        const cards = document.createElement('div');
        cards.className = 'menu-chat-products';
        for (const id of productIds) {
            const product = menuData.products.find((item) => item.id === id);
            if (!product) continue;

            const button = document.createElement('button');
            button.type = 'button';
            const name = document.createElement('strong');
            name.textContent = product.name;
            const price = document.createElement('span');
            const single = product.price || ['İçecek', 'Tatlı'].includes(product.categoryId);
            const first = currency.format(Number(product.price || product.bir));
            price.textContent = single ? first : `1 porsiyon ${first}`;
            if (!single && Number.isFinite(Number(product.birbucuk)) && Number(product.birbucuk) > 0) {
                price.textContent += ` · 1,5 porsiyon ${currency.format(Number(product.birbucuk))}`;
            }
            button.append(name, price);
            button.addEventListener('click', () => {
                dialog.close();
                document.dispatchEvent(new CustomEvent('menu:show-product', { detail: id }));
            });
            cards.append(button);
        }
        if (cards.childElementCount) messages.append(cards);
    }

    async function ask(question) {
        const content = question.trim();
        if (!content || pending) return;

        pending = true;
        send.disabled = true;
        input.value = '';
        suggestions.hidden = true;
        const bubble = addMessage(content, 'user');
        status.textContent = 'Yanıt hazırlanıyor…';
        scrollToLatest();

        const userMessage = { role: 'user', content };
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...history.slice(-6), userMessage] }),
                signal: AbortSignal.timeout(18000),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);

            addMessage(result.reply, 'assistant');
            addProducts(result.productIds);
            const names = result.productIds.map((id) => menuData.products.find((item) => item.id === id)?.name)
                .filter(Boolean);
            const references = names.length ? `\nListelenen ürünler: ${names.join(', ')}.` : '';
            history.push(userMessage, { role: 'assistant', content: result.reply + references });
            if (history.length > 6) history.splice(0, history.length - 6);
            status.textContent = '';
        } catch (error) {
            const fallback = 'Şu anda yanıt alamadım. Sorunu tekrar gönderebilirsin.';
            status.textContent = error.message.startsWith('Sohbet') ? error.message : fallback;
            bubble.remove();
            if (!input.value) input.value = content;
            suggestions.hidden = history.length > 0;
        } finally {
            send.disabled = false;
            pending = false;
            scrollToLatest();
        }
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        ask(input.value);
    });
    suggestions.addEventListener('click', (event) => {
        if (event.target instanceof HTMLButtonElement) ask(event.target.textContent);
    });
})();
