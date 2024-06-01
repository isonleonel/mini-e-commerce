
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Añade un producto al carrito, contiene la lógica para verificar si el producto se encuentra en el carrito para sumar la cantidad.
export const addToCart = (productId) => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            const cartItem = cart.find(item => item.id === product.id);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            saveCartToLocalStorage();
            renderCart();
        })
        .catch(error => console.error('Error adding to cart:', error));
};

// Funcion que renderiza el carrito utilizando un dropdown list.
export const renderCart = () => {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');

    cartItems.innerHTML = `
        <li class="dropdown-header">Cart Items</li>
        <li><hr class="dropdown-divider"></li>
    `;

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        cartItems.innerHTML += `
            <li class="dropdown-item d-flex justify-content-between align-items-center">
                ${item.title} (${item.quantity})
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">X</button>
            </li>
        `;
    });

    cartCount.innerText = cart.length;
    cartSubtotal.innerText = `Subtotal: $${subtotal.toFixed(2)}`;
    cartItems.appendChild(cartSubtotal);
};

// Función para eliminar un producto del carrito según su ID.
export const removeFromCart = (productId) => {
    const cartItemIndex = cart.findIndex(item => item.id === productId);
    if (cartItemIndex !== -1) {
        cart.splice(cartItemIndex, 1);
    }
    saveCartToLocalStorage();
    renderCart();
};

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
