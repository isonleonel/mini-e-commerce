// Archivo principal en donde se renderizan los distintos componentes.

import { loadCategories } from './components/categories.js';
import { loadProducts } from './components/products.js';
import { renderCart } from './components/cart.js';

window.loadProducts = loadProducts;
window.loadCategories = loadCategories;

document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadProducts();
    renderCart();
});