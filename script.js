document.addEventListener('DOMContentLoaded', () => {
    const products = {
        'website': [
            { id: 'PW',   name: "Tu Página Web Profesional en Sólo 48 Horas Todo lo que necesitas para tener una web profesional y exitosa. <strong>Portafolio Visual</strong> 10 imágenes personalizadas que muestran lo mejor de tu negocio. <strong>Misión y Visión</strong> Redacción de la misión y visión de tu empresa para transmitir tus valores. <strong>Dominio Exclusivo</strong> Tu propio dominio web (www.tunegocio.cl). <strong>Hosting Anual Incluído</strong>: Alojamiento seguro y confiable durante todo un año. <strong>¡Tu página web online en solo 48 horas! Comienza ahora y lleva tu negocio al siguiente nivel. ¡Contáctanos hoy mismo!</strong>", price: 199.99, image: 'assets/images/Primera.png', tags: ['rojo', 'rosas', 'ligero', 'Rosatel'] },
            { id: 'ACC6R-6G-HIP', name: '<strong>¡Inicia sesión con Google y comienza ahora mismo!</strong> <strong>Accede rápido</strong> a todas las funcionalidades.<strong>Registro inmediato</strong> sin necesidad de crear nuevas contraseñas.<strong>Todo con un solo clic</strong>: Utiliza tu cuenta de Google para entrar rápidamente y disfrutar de nuestra plataforma.', price: 79.99, image: 'assets/images/Segunda.png', tags: ['amarillo', 'girasoles', 'mediano', 'Rosatel'] },
            { id: 'ACC-6R-GER-FLO', name: '<strong>¡Crea tu cuenta personalizada hoy mismo!</strong> <strong>Accede rápidamente</strong>: Regístrate con tu correo y contraseña en solo unos minutos. <strong>Control total</strong>: Personaliza tu cuenta según tus preferencias y accede con seguridad.<strong>Disfruta de una experiencia única</strong>: Personaliza tus ajustes, preferencias y mucho más.', price: 119.99, image: 'assets/images/Tercera.png', tags: ['blanco', 'rosado', 'flores', 'pesado', 'Rosatel'] },
            { id: 'FR-100-COR', name: '<strong>¡Haz que tu empresa sea accesible con un clic! Botón WhatsApp Flotante + Mensaje Personalizado</strong> <strong>No más barreras de comunicación</strong>: Coloca el botón flotante en tu sitio web y permite a tus clientes contactarte fácilmente.<strong>Comienza con un mensaje personalizado</strong>: Haz que tu primer contacto sea único y acorde con tu marca.<strong>¡Actúa ahora!</strong> Da a tus clientes una vía directa para interactuar contigo en tiempo real.', price: 69.99, image: 'assets/images/4.png', tags: ['amarillo', 'chocolate', 'dulce', 'cacao', 'ferrero'] },
            { id: 'CHOC-CBCL-120', name: '<strong> ¡Optimiza la atención a tus clientes con un Chatbot Inteligente!</strong> <strong> Automatiza tus interacciones</strong>: Configura hasta 10 preguntas frecuentes que el chatbot responderá de manera automática.<strong> Reduce la carga de trabajo</strong>: Libera a tu equipo de las consultas repetitivas, permitiéndoles enfocarse en tareas de mayor valor. <strong> Comienza ahora mismo</strong>: Da el primer paso para mejorar la experiencia de tus clientes. ¡Configura tu chatbot en minutos!', price: 99.99, image: 'assets/images/Quinta.png', tags: ['rojo', 'chocolate', 'amargo', 'cacao', 'bombones'] },
            { id: 'PEL-OSO-V', name: '<strong>Compra Ya y Recibe en Casa: Carrito de Compras + Despacho a Domicilio </strong> <strong> Agrega tus productos al carrito</strong>: Con un solo clic, empieza a llenar tu carrito de compras. <strong> Realiza el pago fácilmente</strong>: Elige tu método de pago preferido y confirma tu compra en segundos. <strong> Despacho rápido y eficiente</strong>: Recibe tus productos directamente en tu hogar. <strong>¡Compra ahora y recibe tus productos sin salir de casa</strong>!Costo asociado al Botón de Pago asunmido por el Cliente ', price: 329.99, image: 'assets/images/Sexta.png', tags: ['blanco', 'felpa', 'suave', 'toy', 'juguete'] },
            { id: 'PEL-OSO-AM', name: '<strong> Optimiza Tu Experiencia de Navegación con Barra de Búsqueda por Categorías y Tags</strong> <strong> Búsqueda rápida y eficiente</strong>: Encuentra productos, servicios o contenido relevante rápidamente gracias a filtros de categorías y etiquetas. <strong> Acceso fácil a tus intereses</strong>: Personaliza tu búsqueda para que siempre encuentres lo que más te interesa, sin complicaciones. <strong> Mejor experiencia para tus Clientes</strong>: Con esta herramienta, tus visitantes podrán navegar de manera mucho más fluida y efectiva por tu sitio.', price: 69.99, image: 'assets/images/7.png', tags: ['blanco', 'felpa', 'grande', 'toy', 'juguete'] },
            { id: 'PEL-OSO-OD', name: 'Barra Buscador con Inteligencia Artificial Algoritmo de Recomendación', price: 219.99, image: 'assets/images/8.png', tags: ['blanco', 'felpa', 'grande', 'toy', 'juguete'] },
            { id: 'PEL-OSO-OS', name: 'Soporte y Mantenimiento Mensual', price: 35.99, image: 'assets/images/9.png', tags: ['blanco', 'felpa', 'grande', 'toy', 'juguete'] }
        ],
        'agendamientoweb': [],
        'plataformaagil': []
    };

    const currencyConfig = {
        currencyCode: 'CLP',
        exchangeRate: 1000,
        symbol: '$',
        format: new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })
    };

    let cart = [];
    const searchBar = document.getElementById('search-bar');
    const clearSearchButton = document.getElementById('clear-search');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const clearCartButton = document.getElementById('clear-cart');

    categoryButtons.forEach(button => {
        const category = button.getAttribute('data-category');
        displayProducts(category);
        const productsContainer = document.getElementById(category);
        productsContainer.classList.add('open');
        button.addEventListener('click', () => {
            productsContainer.classList.toggle('open');
        });
    });

    function displayProducts(category) {
        const productsContainer = document.getElementById(category);
        productsContainer.innerHTML = '';
        products[category].forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.dataset.name = product.name.toLowerCase();
            productDiv.dataset.category = category.toLowerCase();
            product.tags.forEach(tag => {
                productDiv.dataset[tag.replace(/\s+/g, '_')] = tag.toLowerCase().replace(/\s+/g, '_');
            });

            const priceCurrency = product.price * currencyConfig.exchangeRate;

            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <p>${product.name}</p>
                <span>${currencyConfig.format.format(priceCurrency)} ${currencyConfig.currencyCode}</span>
            `;
            productDiv.addEventListener('click', () => {
                addToCart(product);
            });
            productsContainer.appendChild(productDiv);
        });
    }

    function addToCart(product) {
        cart.push(product);
        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(product => {
            const priceCurrency = product.price * currencyConfig.exchangeRate;
            total += priceCurrency;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                <p>${product.name}</p>
                <span>${currencyConfig.format.format(priceCurrency)} ${currencyConfig.currencyCode}</span>
            `;
            cartItems.appendChild(cartItem);
        });
        totalPrice.innerText = `${currencyConfig.format.format(total)} ${currencyConfig.currencyCode}`;
    }

    clearCartButton.addEventListener('click', () => {
        cart = [];
        updateCart();
    });

    searchBar.addEventListener('input', () => {
        const searchQuery = searchBar.value.toLowerCase().trim();
        const searchTerms = searchQuery.split(/\s+/);

        categoryButtons.forEach(button => {
            const category = button.getAttribute('data-category');
            const productsContainer = document.getElementById(category);
            const productDivs = productsContainer.querySelectorAll('.product');
            let showCategory = false;

            productDivs.forEach(div => {
                const matchesSearch = searchTerms.every(term => {
                    return Object.values(div.dataset).some(value => value.includes(term));
                });

                if (matchesSearch) {
                    div.style.display = 'flex';
                    showCategory = true;
                } else {
                    div.style.display = 'none';
                }
            });

            productsContainer.style.display = showCategory ? 'block' : 'none';
            if (showCategory) {
                productsContainer.classList.add('open');
            } else {
                productsContainer.classList.remove('open');
            }
        });

        if (searchQuery.length > 0) {
            clearSearchButton.style.display = 'block';
        } else {
            clearSearchButton.style.display = 'none';
        }
    });

    clearSearchButton.addEventListener('click', () => {
        searchBar.value = '';
        clearSearchButton.style.display = 'none';
        searchBar.dispatchEvent(new Event('input'));
    });
});
