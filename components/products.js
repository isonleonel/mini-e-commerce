
// Componente "productos" con la función de leer la API y renderizarlos en forma de tarjeta.

export const loadProducts = (category = '') => {
    console.log('Loading products for category:', category);
    let apiUrl = 'https://fakestoreapi.com/products';
    if (category) {
        apiUrl += '/category/' + encodeURIComponent(category);
    }
    console.log('API URL:', apiUrl);
    fetch(apiUrl)
        .then(response => response.json())
        .then(products => {
            console.log('Products loaded:', products);
            const productDiv = document.getElementById('products');
            productDiv.innerHTML = products.map(product => `
                <div class="card col-md-4 my-2" id="product-${product.id}">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">$${product.price}</p>
                        <button class="btn btn-primary" onclick="showProductDetail(${product.id})">Product Detail</button>
                    </div>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error fetching products:', error));
};

// Detalle del producto. Extiende la tarjeta principal del producto mostrando su descripción y su boton de "añadir al carrito".
window.showProductDetail = (productId) => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            const productCard = document.getElementById(`product-${product.id}`);
            productCard.innerHTML = `
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">$${product.price}</p>
                    <p class="card-text">${product.description}</p>
                    <button class="btn btn-success" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn btn-secondary" onclick="collapseProductDetail(${product.id})">Collapse</button>
                </div>
            `;
        })
        .catch(error => console.error('Error fetching product detail:', error));
};

// Recarga la tarjeta cuando el boton de "colapsar" del producto es clickeado ocultando la información del detalle del producto.
window.collapseProductDetail = (productId) => {
    const productCard = document.getElementById(`product-${productId}`);
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            productCard.innerHTML = `
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-primary" onclick="showProductDetail(${product.id})">Product Detail</button>
                </div>
            `;
        })
        .catch(error => console.error('Error fetching product detail:', error));
};
