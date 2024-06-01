
// Componente categoria en donde renderiza el dropdown con las diferentes categorias para filtrar los productos.
export const loadCategories = () => {
    console.log('Loading categories...');
    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(categories => {
            console.log('Categories loaded:', categories);
            const categoriesDropdown = document.getElementById('categories-dropdown');
            categoriesDropdown.innerHTML = `
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    Seleccione la categoria
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a class="dropdown-item" href="#" onclick="filterProducts('')">All Products</a></li>
                    ${categories.map(category => `
                        <li><a class="dropdown-item" href="#" onclick="filterProducts('${category.replace(/'/g, "\\'")}')">${category}</a></li>
                    `).join('')}
                </ul>
            `;
        })
        .catch(error => console.error('Error fetching categories:', error));
};

// Función para filtrar los productos según la categoría
window.filterProducts = (category) => {
    console.log('Filtering products by category:', category);
    loadProducts(category);
};
