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
            description: 'Boru şişte hazırlanan uzun kebap. En az 3 porsiyon hazırlanır. Közlenmiş biber ve domates, bulgur pilavı, ezme ve haydariyle servis edilir.',
            aci: 'acısız',
            bir: '420.00',
            birbucuk: '-------',
            image: 'images/borukebabı.png'
        },

        // URFA SARMASI
         {
            id: 30,
            categoryId: 'Izgara',
            name: 'Urfa Sarması',
            description: 'Rulo şeklinde sarılıp şişe dizilen ızgara et. Közlenmiş biber ve domates, bulgur pilavı, ezme ve haydariyle servis edilir.',
            aci: 'acısız',
            bir: '500.00',
            birbucuk: '-------',
            image: 'images/urfasarmasi.jpeg'
        },

        // ADANA
        {
            id: 2,
            categoryId: 'Izgara',
            name: 'Adana Kebap (150gr)',
            description: 'Geniş şişte pişirilen acılı Adana kebabı. Az acılı seçeneği de vardır. Közlenmiş biber ve domates, bulgur pilavı, ezme ve haydariyle servis edilir.',
            aci: 'acılı, az acılı seçeneği var',
            bir: '400.00',
            birbucuk: '600.00',
            image: 'images/adana.jpg'
        },

        // URFA
        {
            id: 3,
            categoryId: 'Izgara',
            name: 'Urfa Kebap (150gr)',
            description: 'Şişte ızgara edilen acısız Urfa kebabı. Közlenmiş biber ve domates, bulgur pilavı, ezme ve haydariyle servis edilir.',
            aci: 'acısız',
            bir: '400.00',
            birbucuk: '600.00',
            image: 'images/urfa.jpg'
        },

        // TAVUK ŞİŞ
        {
            id: 4,
            categoryId: 'Izgara',
            name: 'Tavuk Şiş',
            description: 'Hafif acılı terbiyeyle hazırlanan tavuk parçaları şişte ızgara edilir. Közlenmiş biber ve domates, bulgur pilavı, ezme ve haydariyle servis edilir.',
            aci: 'az acılı',
            bir: '370.00',
            birbucuk: '550.00',
            image: 'images/tavukşiş.jpg'
        },

        // KANAT
        {
            id: 5,
            categoryId: 'Izgara',
            name: 'Kanat',
            description: 'Hafif acılı terbiyeyle hazırlanan tavuk kanatları ızgarada pişirilir. Közlenmiş biber ve domates, bulgur pilavı, ezme ve haydariyle servis edilir.',
            aci: 'az acılı',
            bir: '380.00',
            birbucuk: '570.00',
            image: 'images/kanat.jpg'
        },

        // KUZU ŞİŞ
        {
            id: 6,
            categoryId: 'Izgara',
            name: 'Kuzu Şiş',
            description: 'Kuşbaşı kuzu eti şişe dizilip ızgarada pişirilir. Közlenmiş biber ve domates, bulgur pilavı, ezme ve haydariyle servis edilir.',
            aci: 'acısız',
            bir: '500.00',
            birbucuk: '750.00',
            image: 'images/kuzuşiş.jpg'
        },

        // BİFTEK
        {
            id: 7,
            categoryId: 'Izgara',
            name: 'Biftek',
            description: 'Bütün dilim biftek ızgarada pişirilir. Közlenmiş biber ve domates, bulgur pilavı, ezme ve haydariyle servis edilir.',
            aci: 'acısız',
            bir: '500.00',
            birbucuk: '750.00',
            image: 'images/biftek.jpg'
        },

        // ET ŞİŞ
        {
            id: 8,
            categoryId: 'Izgara',
            name: 'Et Şiş',
            description: 'Terbiyesinde acı kullanılan kuşbaşı et, şişte ızgara edilir. Közlenmiş biber ve domates, bulgur pilavı, ezme ve haydariyle servis edilir.',
            aci: 'terbiyesinde acı var',
            bir: '500.00',
            birbucuk: '750.00',
            image: 'images/etşiş.jpg'
        },

        // SERVİS KÖFTE
        {
            id: 13,
            categoryId: 'Izgara',
            name: 'Servis Köfte',
            description: 'Izgarada pişirilen yuvarlak köfteler. Közlenmiş biber ve domates, bulgur pilavı, ezme ve haydariyle servis edilir.',
            aci: 'acısız',
            bir: '250.00',
            birbucuk: '380.00',
            image: 'images/köfte.jpg'
        },

        // CİĞER
        {
            id: 9,
            categoryId: 'Izgara',
            name: 'Ciğer',
            description: 'Şişe dizilen ciğer parçaları isotla pişirilir. Közlenmiş biber ve domates, bulgur pilavı, ezme ve haydariyle servis edilir.',
            aci: 'isotlu',
            bir: '340.00',
            birbucuk: '510.00',
            image: 'images/ciğer.jpg'
        },

        // BEYTİ SARMA
        {
            id: 10,
            categoryId: 'Izgara',
            name: 'Beyti Sarma',
            description: 'Lavaşa sarılıp dilimlenen kebap. Közlenmiş biber ve domates, bulgur pilavı, ezme ve haydariyle servis edilir.',
            aci: 'acısız',
            bir: '450.00',
            birbucuk: '680.00',
            image: 'images/beytisarma.jpg'
        },

        // PATLICAN KEBAP
        {
            id: 11,
            categoryId: 'Izgara',
            name: 'Patlıcan Kebabı',
            description: 'Patlıcan dilimleriyle kebap köfteleri şişte birlikte ızgara edilir. Közlenmiş biber ve domates, bulgur pilavı, ezme ve haydariyle servis edilir.',
            aci: 'acısız',
            bir: '420.00',
            birbucuk: '-------',
            image: 'images/patlıcankebap.jpg'
        },

        // DOMATESLİ KEBAP
        {
            id: 12,
            categoryId: 'Izgara',
            name: 'Domatesli Kebap',
            description: 'Domates ve kebap köfteleri ızgarada birlikte pişirilir. Közlenmiş biber ve domates, bulgur pilavı, ezme ve haydariyle servis edilir.',
            aci: 'acısız',
            bir: '420.00',
            birbucuk: '-------',
            image: 'images/domateslikebap.jpg'
        },

        //ADANA DÜRÜM
        {
            id: 14,
            categoryId: 'Dürüm',
            name: 'Adana Dürüm (150gr)',
            description: 'Acılı Adana kebabı lavaşa sarılır. Az acılı seçeneği de vardır. Közlenmiş biber, ezme ve haydariyle servis edilir.',
            aci: 'acılı, az acılı seçeneği var',
            bir: '400.00',
            birbucuk: '600.00',
            image: 'images/adanadürüm.jpg'
        },

        // URFA DÜRÜM
        {
            id: 15,
            categoryId: 'Dürüm',
            name: 'Urfa Dürüm (150gr)',
            description: 'Acısız Urfa kebabı lavaşa sarılır. Közlenmiş biber, ezme ve haydariyle servis edilir.',
            aci: 'acısız',
            bir: '400.00',
            birbucuk: '600.00',
            image: 'images/urfadürüm.jpg'
        },

        // TAVUK ŞİŞ
        {
            id: 19,
            categoryId: 'Dürüm',
            name: 'Tavuk Dürüm',
            description: 'Hafif acılı terbiyeyle hazırlanan ızgara tavuk şiş lavaşa sarılır. Közlenmiş biber, ezme ve haydariyle servis edilir.',
            aci: 'az acılı',
            bir: '370.00',
            birbucuk: '550.00',
            image: 'images/tavukşişdürüm.jpg'
        },

        // CİĞER
        {
            id: 16,
            categoryId: 'Dürüm',
            name: 'Ciğer Dürüm',
            description: 'Isotla pişirilen ızgara ciğer lavaşa sarılır. Közlenmiş biber, ezme ve haydariyle servis edilir.',
            aci: 'isotlu',
            bir: '340.00',
            birbucuk: '510.00',
            image: 'images/ciğerdürüm.jpg'
        },

        // EKMEK ARASI KÖFTE
        {
            id: 17,
            categoryId: 'Dürüm',
            name: 'Ekmek Arası Köfte',
            description: 'Izgara köfteler ekmek arasında sunulur. Közlenmiş biber, ezme ve haydariyle servis edilir.',
            aci: 'acısız',
            bir: '250.00',
            birbucuk: '380.00',
            image: 'images/ekmekarasıköfte.jpg'
        },

        // KÜNEFE
        {
            id: 18,
            categoryId: 'Tatlı',
            name: 'Künefe',
            description: 'Kızarmış tel kadayıf ve eriyen peynirle hazırlanan şerbetli tatlı.',
            bir: '300.00',
            image: 'images/künefe.jpg'
        },

        // ANTEP KATMERİ
        {
            id: 20,
            categoryId: 'Tatlı',
            name: 'Antep Katmeri',
            description: 'İnce katları arasında fıstık ve kaymak bulunan, üzeri fıstıklı şerbetli katmer.',
            bir: '300.00',
            image: 'images/antepkatmeri.jpg'
        },



        // GAZLI İÇECEKLER
        {
            id: 21,
            categoryId: 'İçecek',
            name: 'Gazlı İçecekler',
            description: 'Coca-Cola, Fanta, Sprite ve Pepsi seçenekleri.',
            bir: '100.00',
            image: 'images/kolafantaspritepepsi.png'
        },

        // İceTea
        {
            id: 22,
            categoryId: 'İçecek',
            name: 'İceTea',
            description: 'Lipton soğuk çay çeşitleri.',
            bir: '100.00',
            image: 'images/liptonlar.png'
        },

        // AÇIK AYRAN
        {
            id: 23,
            categoryId: 'İçecek',
            name: 'Yayık Ayran',
            description: 'Bol köpüklü açık yayık ayranı.',
            bir: '80.00',
            image: 'images/açıkayran.jpg'
        },

        // AYRAN
        {
            id: 24,
            categoryId: 'İçecek',
            name: 'Ayran',
            description: 'Sütaş bardak ayran.',
            bir: '30.00',
            image: 'images/ayran.png'
        },

        // MEYVE SULARI
        {
            id: 25,
            categoryId: 'İçecek',
            name: 'Meyve Suyu',
            description: 'Cappy meyve suyu çeşitleri.',
            bir: '100.00',
            image: 'images/cappy.png'
        },

        // Soda
        {
            id: 26,
            categoryId: 'İçecek',
            name: 'Soda',
            description: 'Kızılay sade ve meyveli maden suyu çeşitleri.',
            bir: '30.00',
            image: 'images/meyvelisoda.png'
        },

        // Şalgam
        {
            id: 27,
            categoryId: 'İçecek',
            name: 'Şalgam',
            description: 'Doğanay şişe şalgam suyu.',
            bir: '90.00',
            image: 'images/şalgam.png'
        },

        // Su
        {
            id: 28,
            categoryId: 'İçecek',
            name: 'Su',
            description: 'Şişe su.',
            bir: '20.00',
            image: 'images/su.png'
        },

    ]
};

if (typeof module !== 'undefined') {
    module.exports = menuData;
}
