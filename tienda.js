// ==========================================================================
// ESTADO DE LA APLICACIÓN (CARRITO)
// ==========================================================================
let cart = [];

// Elementos del DOM del Carrito
const cartToggle = document.getElementById('cart-toggle');
const closeCartBtn = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Elementos del DOM del Buscador y Productos
const searchInput = document.getElementById('search-input');
const productCards = document.querySelectorAll('.product-card');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// ==========================================================================
// FUNCIONALIDAD 1: BUSCADOR EN TIEMPO REAL
// ==========================================================================
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    productCards.forEach(card => {
        // Obtenemos el nombre asignado en el atributo 'data-name'
        const productName = card.getAttribute('data-name');
        
        // Verificamos si el término buscado coincide con el nombre
        if (productName.includes(searchTerm)) {
            card.style.display = "flex"; // Muestra la tarjeta de producto
        } else {
            card.style.display = "none"; // Oculta la tarjeta de producto
        }
    });
});

// ==========================================================================
// FUNCIONALIDAD 2: GESTIÓN DEL CARRITO DE COMPRAS
// ==========================================================================

// Abrir y Cerrar Sidebar del carrito
cartToggle.addEventListener('click', () => cartSidebar.classList.add('open'));
closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('open'));

// Escuchar clics en los botones de "Añadir al carrito"
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const name = e.target.getAttribute('data-name');
        const price = parseFloat(e.target.getAttribute('data-price'));

        addItemToCart(id, name, price);
    });
});

// Agregar producto al array del carrito
function addItemToCart(id, name, price) {
    // Comprobar si el producto ya existe en el carrito
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCartUI();
}

// Eliminar producto del carrito
function removeItemFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// Actualizar la Interfaz Gráfica del Carrito (Contador, Lista y Total)
function updateCartUI() {
    // 1. Limpiar el contenedor actual
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">El carrito está vacío.</p>';
        cartCountElement.textContent = '0';
        cartTotalElement.textContent = '$0.00';
        return;
    }

    let totalItems = 0;
    let totalPrice = 0;

    // 2. Renderizar cada producto activo en el carrito
    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <small>${item.quantity} x $${item.price}</small>
            </div>
            <button class="cart-item-remove" onclick="removeItemFromCart('${item.id}')">&times;</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // 3. Actualizar contadores globales en la pantalla
    cartCountElement.textContent = totalItems;
    cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// ==========================================================================
// FUNCIONALIDAD 3: FINALIZAR COMPRA INTERACTIVA
// ==========================================================================
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Tu carrito está vacío. ¡Añade algunos productos primero!');
        return;
    }

    // Alerta de éxito con simulación de proceso completado
    alert(`🎉 ¡Compra finalizada con éxito!\nTotal procesado: ${cartTotalElement.textContent}\nGracias por comprar en UNITEC Marketplace.`);
    
    // Vaciar carrito y cerrar barra lateral
    cart = [];
    updateCartUI();
    cartSidebar.classList.remove('open');
});
