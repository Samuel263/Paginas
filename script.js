document.addEventListener('DOMContentLoaded', () => {
    const products = {
        'website': [
            { id: 'PW', name: 'Página Web Informativa: Portafolio de 10 imágenes + elaboración de la Misión y la Visión de tu negocio + Dominio(www.name.cl) + Hosting Anual en 48 Horas', price: 149.99, image: 'assets/images/Primera.png', tags: ['rojo', 'rosas', 'ligero', 'Rosatel'] },
            { id: 'ACC6R-6G-HIP', name: '"Registro de Usuarios" Login y Acceso con Google', price: 39.99, image: 'assets/images/Segunda.png', tags: ['amarillo', 'girasoles', 'mediano', 'Rosatel'] },
            { id: 'ACC-6R-GER-FLO', name: '"Registro de Usuarios" Login y Acceso con Cuenta Personalizada', price: 49.99, image: 'assets/images/Tercera.png', tags: ['blanco', 'rosado', 'flores', 'pesado', 'Rosatel'] },
            { id: 'FR-100-COR', name: 'Botón de Whatsapp Flotante con Mensaje Personalizado de Empresa', price: 39.99, image: 'assets/images/4.png', tags: ['amarillo', 'chocolate', 'dulce', 'cacao', 'ferrero'] },
            { id: 'CHOC-CBCL-120', name: 'Chatbot con Inteligencia Artificial Interacción con Clientes 10 Preguntas', price: 69.99, image: 'assets/images/5.png', tags: ['rojo', 'chocolate', 'amargo', 'cacao', 'bombones'] },
            { id: 'PEL-OSO-V', name: 'Carrito de Compras + Despacho a Domicilio + Botón de Pago (costo asume el cliente)', price: 129.99, image: 'assets/images/6.png', tags: ['blanco', 'felpa', 'suave', 'toy', 'juguete'] },
            { id: 'PEL-OSO-AM', name: 'Barra Buscador en Categorías y Tags', price: 49.99, image: 'assets/images/7.png', tags: ['blanco', 'felpa', 'grande', 'toy', 'juguete'] },
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
