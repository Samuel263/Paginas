document.addEventListener('DOMContentLoaded', () => {
    const products = {
        'website': [
            { id: 'PW', name: 'Página Web Informativa: Portafolio de 10 imágenes + elaboración de la Misión y la Visión de tu negocio + Dominio(www.name.cl) + Hosting Anual en 48 Horas', price: 149.99, image: 'assets/images/image1.jpg', tags: ['rojo', 'rosas', 'ligero', 'Rosatel'] },
            { id: 'ACC6R-6G-HIP', name: '"Registro de Usuarios" Login y Acceso con Google', price: 29.99, image: 'assets/images/image1.jpg', tags: ['amarillo', 'girasoles', 'mediano', 'Rosatel'] },
            { id: 'ACC-6R-GER-FLO', name: '"Registro de Usuarios" Login y Acceso con Cuenta Personalizada', price: 29.99, image: 'assets/images/image1.jpg', tags: ['blanco', 'rosado', 'flores', 'pesado', 'Rosatel'] },
             { id: 'FR-100-COR', name: 'Botón de Whatsapp Flotante con Mensaje Personalizado de Empresa', price: 19.99, image: 'assets/images/image1.jpg', tags: ['amarillo', 'chocolate', 'dulce', 'cacao', 'ferrero'] },
            { id: 'CHOC-CBCL-120', name: 'Chatbot con Inteligencia Artificial Interacción con Clientes 10 Preguntas', price: 49.99, image: 'assets/images/image1.jpg', tags: ['rojo', 'chocolate', 'amargo', 'cacao', 'bombones'] },
               { id: 'PEL-OSO-V', name: 'Carrito de Compras + Despacho a Domicilio + Botón de Pago (costo asume el cliente)', price: 89.99, image: 'assets/images/image1.jpg', tags: ['blanco', 'felpa', 'suave', 'toy', 'juguete'] },
            { id: 'PEL-OSO-AM', name: 'Barra Buscador en Categorías y Tags', price: 19.99, image: 'assets/images/image1.jpg', tags: ['blanco', 'felpa', 'grande', 'toy', 'juguete'] },
            { id: 'PEL-OSO-OD', name: 'Barra Buscador con Inteligencia Artificial Algoritmo de Recomendación', price: 12.99, image: 'assets/images/image1.jpg', tags: ['blanco', 'felpa', 'grande', 'toy', 'juguete'] }
        ],
        'agendamientoweb': [
         
        ],
        'plataformaagil': [
        
        ]
    };

    // Configuración de la conversión de moneda
    const currencyConfig = {
        currencyCode: 'CLP', // Código de la moneda de destino
        exchangeRate: 1000, // Tasa de cambio (1 USD a 'exchangeRate' unidades de la moneda de destino)
        symbol: '$' // Símbolo de la moneda de destino
    };

    let cart = [];
    const searchBar = document.getElementById('search-bar');
    const clearSearchButton = document.getElementById('clear-search');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    categoryButtons.forEach(button => {
        const category = button.getAttribute('data-category');
        displayProducts(category);
        const productsContainer = document.getElementById(category);
        productsContainer.classList.add('open');
        button.addEventListener('click', () => {
            productsContainer.classList.toggle('open');
            button.innerHTML = productsContainer.classList.contains('open') ? `Hide ${capitalizeFirstLetter(category)}` : capitalizeFirstLetter(category);
        });
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

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

            // Convertir el precio a la moneda de destino
            const priceCurrency = product.price * currencyConfig.exchangeRate;

            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <p>${product.name}</p>
                <span>${currencyConfig.symbol}${priceCurrency.toFixed(2)} ${currencyConfig.currencyCode}</span>
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
            // Utilizar el precio convertido a la moneda de destino para el carrito
            const priceCurrency = product.price * currencyConfig.exchangeRate;
            total += priceCurrency;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${product.name}</p>
                <span>${currencyConfig.symbol}${priceCurrency.toFixed(2)} ${currencyConfig.currencyCode}</span>
            `;
            cartItems.appendChild(cartItem);
        });
        totalPrice.innerText = `${currencyConfig.symbol}${total.toFixed(2)} ${currencyConfig.currencyCode}`;
    }

    document.getElementById('clear-cart').addEventListener('click', () => {
        cart = [];
        updateCart();
    });

    searchBar.addEventListener('input', () => {
        const searchQuery = searchBar.value.toLowerCase().trim();
        const searchTerms = searchQuery.split(/\s+/); // Split search query into individual terms

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
                button.innerHTML = `Hide ${capitalizeFirstLetter(category)}`;
            } else {
                productsContainer.classList.remove('open');
                button.innerHTML = capitalizeFirstLetter(category);
            }
        });

        // Mostrar u ocultar el botón de borrar según si hay texto en el input
        if (searchQuery.length > 0) {
            clearSearchButton.style.display = 'block';
        } else {
            clearSearchButton.style.display = 'none';
        }
    });

    // Event listener para el botón de borrar
    clearSearchButton.addEventListener('click', () => {
        searchBar.value = ''; // Limpiar el contenido del input
        clearSearchButton.style.display = 'none'; // Ocultar el botón de borrar
        searchBar.dispatchEvent(new Event('input')); // Disparar evento input para actualizar la búsqueda
    });

    // Filter products by price
    function filterByPrice(query, product) {
        if (query.includes('<')) {
            const price = parseFloat(query.split('<')[1]);
            return product.price < price;
        }
        if (query.includes('>')) {
            const price = parseFloat(query.split('>')[1]);
            return product.price > price;
        }
        return true;
    }
});








