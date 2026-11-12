

document.addEventListener('DOMContentLoaded', () => {
    const categoryTabs = document.getElementById('categoryTabs');
    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');

    let currentCategory = 'Izgara';
    let searchQuery = '';




    // Render Categories
    function renderCategories() {
        categoryTabs.innerHTML = menuData.categories.map(cat => `
            <div class="tab ${currentCategory === cat.id ? 'active' : ''}" 
                 onclick="setCategory('${cat.id}')">
                ${cat.name}
            </div>
        `).join('');
    }

    // Render Products
    function renderProducts() {
        const filteredProducts = menuData.products.filter(product => {
            const matchesCategory = currentCategory === 'all' || product.categoryId === currentCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (filteredProducts.length === 0) {
            productGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                    Aradığınız kriterlere uygun ürün bulunamadı.
                </div>
            `;
            return;
        }

        productGrid.innerHTML = filteredProducts.map(product => {
            let priceHTML = '';

            if (product.categoryId === 'İçecek' || product.categoryId === 'Tatlı' || product.price) {
                // Single price display for drinks, desserts, or items with 'price' field
                priceHTML = `
                    <div class="product-footer">
                        <a>Adet</a>
                        <span class="product-price">${product.price || product.bir}₺</span>
                    </div>
                `;
            } else {
                // Portion based display (bir/birbuçuk)
                priceHTML = `
                <div><h3 class=baslik-porsiyon>Porsiyon</h3></div>
                    <div class="product-footer">
                    
                    
                        <a>Bir</a>
                        <span class="product-price">${product.bir}₺</span>
                    </div>
                    <div class="product-footer">
                        <a>Birbuçuk</a>
                        <span class="product-price">${product.birbucuk}₺</span>
                    </div>
                
                `;
            }

            return `
                <div class="product-card" id="product-${product.id}" tabindex="-1">
                    <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://placehold.co/600x400/1a1a1a/c9a050?text=${encodeURIComponent(product.name)}'">
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-desc">${product.description}</p>
                        ${priceHTML}
                    </div>
                </div>
            `;
        }).join('');
    }
    // Set Category
    window.setCategory = (id) => {
        currentCategory = id;
        renderCategories();
        renderProducts();
    };

    document.addEventListener('menu:show-product', (event) => {
        const product = menuData.products.find(({ id }) => id === event.detail);
        if (!product) return;

        searchInput.value = '';
        searchQuery = '';
        window.setCategory(product.categoryId);
        const card = document.getElementById(`product-${product.id}`);
        card.focus({ preventScroll: true });
        card.scrollIntoView({ block: 'center' });
    });

    // Search logic
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProducts();
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    function setTheme(isLight) {
        if (isLight) {
            document.body.classList.add('light-mode');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-mode');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
            localStorage.setItem('theme', 'dark');
        }
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        setTheme(true);
    }

    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-mode');
        setTheme(!isLight);
    });

    // About Us Modal Logic
    const aboutBtn = document.getElementById('aboutBtn');
    const aboutModal = document.getElementById('aboutModal');
    const modalClose = aboutModal.querySelector('.modal-close');

    aboutBtn.addEventListener('click', () => {
        aboutModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    });

    function closeModal() {
        aboutModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    }

    modalClose.addEventListener('click', closeModal);

    // Close on background click
    aboutModal.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
            closeModal();
        }
    });

    // Initial Render
    renderCategories();
    renderProducts();
});
