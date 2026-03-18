




const menuData = {
    categories: [

        { id: 'Izgara', name: 'Izgaralar' },
        { id: 'Dürüm', name: 'Dürümler ve Ekmek Araları' },
        { id: 'Tatlı', name: 'Tatlılar' },
        { id: 'İçecek', name: 'İçecekler' }
    ],
    products: [

        // BORU KEBABI
        {
            id: 1,
            categoryId: 'Izgara',
            name: 'Boru Kebabı',
            description: 'En Az 3 Porsiyon Yapılmaktadır!  Közlenmiş biber/domates, Bulgur Pilavı, Ezme ve Haydari ile servis edilmektedir.',
            bir: '380.00',
            birbucuk: '-------',
            image: 'images/borukebabı.png'
        },

        // ADANA
        {
            id: 2,
            categoryId: 'Izgara',
            name: 'Adana Kebap (150gr)',
            description: 'Közlenmiş biber/domates, Bulgur Pilavı, Ezme ve Haydari ile servis edilmektedir.',
            bir: '350.00',
            birbucuk: '530.00',
            image: 'images/adana.jpg'
        },

        // URFA
        {
            id: 3,
            categoryId: 'Izgara',
            name: 'Urfa Kebap (150gr)',
            description: 'Közlenmiş biber/domates, Bulgur Pilavı, Ezme ve Haydari ile servis edilmektedir.',
            bir: '350.00',
            birbucuk: '530.00',
            image: 'images/urfa.jpg'
        },

        // TAVUK ŞİŞ
        {
            id: 4,
            categoryId: 'Izgara',
            name: 'Tavuk Şiş',
            description: 'Közlenmiş biber/domates, Bulgur Pilavı, Ezme ve Haydari ile servis edilmektedir.',
            bir: '330.00',
            birbucuk: '490.00',
            image: 'images/tavukşiş.jpg'
        },

        // KANAT
        {
            id: 5,
            categoryId: 'Izgara',
            name: 'Kanat',
            description: 'Közlenmiş biber/domates, Bulgur Pilavı, Ezme ve Haydari ile servis edilmektedir.',
            bir: '340.00',
            birbucuk: '510.00',
            image: 'images/kanat.jpg'
        },

        // KUZU ŞİŞ
        {
            id: 6,
            categoryId: 'Izgara',
            name: 'Kuzu Şiş',
            description: 'Közlenmiş biber/domates, Bulgur Pilavı, Ezme ve Haydari ile servis edilmektedir.',
            bir: '450.00',
            birbucuk: '680.00',
            image: 'images/kuzuşiş.jpg'
        },

        // BİFTEK
        {
            id: 7,
            categoryId: 'Izgara',
            name: 'Biftek',
            description: 'Közlenmiş biber/domates, Bulgur Pilavı, Ezme ve Haydari ile servis edilmektedir.',
            bir: '450.00',
            birbucuk: '680.00',
            image: 'images/biftek.jpg'
        },

        // ET ŞİŞ 
        {
            id: 8,
            categoryId: 'Izgara',
            name: 'Et Şiş',
            description: 'Közlenmiş biber/domates, Bulgur Pilavı, Ezme ve Haydari ile servis edilmektedir.',
            bir: '450.00',
            birbucuk: '680.00',
            image: 'images/etşiş.jpg'
        },

        // SERVİS KÖFTE
        {
            id: 13,
            categoryId: 'Izgara',
            name: 'Servis Köfte',
            description: 'Közlenmiş biber/domates, Bulgur Pilavı, Ezme ve Haydari ile servis edilmektedir.',
            bir: '220.00',
            birbucuk: '330.00',
            image: 'images/köfte.jpg'
        },


        // CİĞER
        {
            id: 9,
            categoryId: 'Izgara',
            name: 'Ciğer',
            description: 'Közlenmiş biber/domates, Bulgur Pilavı, Ezme ve Haydari ile servis edilmektedir.',
            bir: '300.00',
            birbucuk: '450.00',
            image: 'images/ciğer.jpg'
        },

        // BEYTİ SARMA
        {
            id: 10,
            categoryId: 'Izgara',
            name: 'Beyti Sarma',
            description: 'Közlenmiş biber/domates, Bulgur Pilavı, Ezme ve Haydari ile servis edilmektedir.',
            bir: '400.00',
            birbucuk: '600.00',
            image: 'images/beytisarma.jpg'
        },

        // PATLICAN KEBAP
        {
            id: 11,
            categoryId: 'Izgara',
            name: 'Patlıcan Kebabı',
            description: 'Közlenmiş biber/domates, Bulgur Pilavı, Ezme ve Haydari ile servis edilmektedir.',
            bir: '400.00',
            birbucuk: '-------',
            image: 'images/patlıcankebap.jpg'
        },

        // DOMATESLİ KEBAP
        {
            id: 12,
            categoryId: 'Izgara',
            name: 'Domatesli Kebap',
            description: 'Közlenmiş biber/domates, Bulgur Pilavı, Ezme ve Haydari ile servis edilmektedir.',
            bir: '400.00',
            birbucuk: '-------',
            image: 'images/domateslikebap.jpg'
        },

        //ADANA DÜRÜM
        {
            id: 14,
            categoryId: 'Dürüm',
            name: 'Adana Dürüm (150gr)',
            description: 'Közlenmiş biber, Ezme ve Haydari ile servis edilmektedir.',
            bir: '350.00',
            birbucuk: '530.00',
            image: 'images/adanadürüm.jpg'
        },

        // URFA DÜRÜM
        {
            id: 15,
            categoryId: 'Dürüm',
            name: 'Urfa Dürüm (150gr)',
            description: 'Közlenmiş biber, Ezme ve Haydari ile servis edilmektedir.',
            bir: '350.00',
            birbucuk: '530.00',
            image: 'images/urfadürüm.jpg'
        },

        // TAVUK ŞİŞ
        {
            id: 19,
            categoryId: 'Dürüm',
            name: 'Tavuk Dürüm',
            description: 'Közlenmiş biber, Ezme ve Haydari ile servis edilmektedir.',
            bir: '330.00',
            birbucuk: '490.00',
            image: 'images/tavukşişdürüm.jpg'
        },

        // CİĞER
        {
            id: 16,
            categoryId: 'Dürüm',
            name: 'Ciğer Dürüm',
            description: 'Közlenmiş biber, Ezme ve Haydari ile servis edilmektedir.',
            bir: '300.00',
            birbucuk: '450.00',
            image: 'images/ciğerdürüm.jpg'
        },


        // EKMEK ARASI KÖFTE
        {
            id: 17,
            categoryId: 'Dürüm',
            name: 'Ekmek Arası Köfte',
            description: 'Közlenmiş biber, Ezme ve Haydari ile servis edilmektedir.',
            bir: '220.00',
            birbucuk: '330.00',
            image: 'images/ekmekarasıköfte.jpg'
        },

        // KÜNEFE
        {
            id: 18,
            categoryId: 'Tatlı',
            name: 'Künefe',
            description: 'Künefe peynirli, Şerbetli ',
            bir: '200.00',
            image: 'images/künefe.jpg'
        },

        // ANTEP KATMERİ
        {
            id: 19,
            categoryId: 'Tatlı',
            name: 'Antep Katmeri',
            description: 'Fıstıklı, Kaymaklı, Şerbetli ',
            bir: '200.00',
            image: 'images/antepkatmeri.jpg'
        },

        // Burma Kadayıf
        {
            id: 20,
            categoryId: 'Tatlı',
            name: 'Fıstıklı Burma Kadayıf',
            description: 'Fıstıklı, Şerbetli',
            bir: '200.00',
            image: 'images/burmakadayıf.jpg'
        },

        // GAZLI İÇECEKLER
        {
            id: 21,
            categoryId: 'İçecek',
            name: 'Gazlı İçecekler',
            description: 'KOLA, FANTA, SPRİTE, PEPSİ',
            bir: '80.00',
            image: 'images/kolafantaspritepepsi.png'
        },

        // İceTea
        {
            id: 22,
            categoryId: 'İçecek',
            name: 'İceTea',
            description: 'Lipton İceTea Çeşitleri',
            bir: '80.00',
            image: 'images/liptonlar.png'
        },

        // AÇIK AYRAN
        {
            id: 23,
            categoryId: 'İçecek',
            name: 'Yayık Ayran',
            description: 'Bol Köpüklü Yayık Ayran',
            bir: '70.00',
            image: 'images/açıkayran.jpg'
        },

        // AYRAN
        {
            id: 24,
            categoryId: 'İçecek',
            name: 'Ayran',
            description: 'Sütaş Ayran',
            bir: '30.00',
            image: 'images/ayran.png'
        },

        // MEYVE SULARI
        {
            id: 25,
            categoryId: 'İçecek',
            name: 'Meyve Suyu',
            description: 'Cappy Meyve Suyu Çeşitleri',
            bir: '80.00',
            image: 'images/cappy.png'
        },

        // Soda
        {
            id: 26,
            categoryId: 'İçecek',
            name: 'Soda',
            description: 'Sade ve Meyveli Kızılay Soda Çeşitleri',
            bir: '30.00',
            image: 'images/meyvelisoda.png'
        },

        // Şalgam
        {
            id: 27,
            categoryId: 'İçecek',
            name: 'Şalgam',
            description: 'Doğanay Şalgam',
            bir: '70.00',
            image: 'images/şalgam.png'
        },

        // Su
        {
            id: 28,
            categoryId: 'İçecek',
            name: 'Su',
            description: '',
            bir: '20.00',
            image: 'images/su.png'
        },





    ]
};

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
                <div class="product-card">
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
