// cart.js

// Global Variables
const cartPanel = document.getElementById('cartPanel');
const overlay = document.getElementById('overlay');
let quantity = 1;  // Default quantity for product pages

// Cart toggle
function toggleCart() {
  cartPanel.classList.toggle('open');
  overlay.classList.toggle('active');
}

// Show temporary cart message
function showCartMessage(message) {
  const msgBox = document.getElementById('cart-message');
  msgBox.textContent = message;
  msgBox.classList.add('show');
  setTimeout(() => msgBox.classList.remove('show'), 2000);
}

// Increase / Decrease product quantity (for product pages)
function increaseQuantity() {
  quantity++;
  updateQuantityDisplay();
}

function decreaseQuantity() {
  if (quantity > 1) {
    quantity--;
    updateQuantityDisplay();
  }
}

function updateQuantityDisplay() {
  const quantitySpan = document.getElementById('quantity');
  if (quantitySpan) {
    quantitySpan.textContent = quantity;
  }
}

// Add to cart
function addToCart(productName, price, qtyOverride = null) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const inputQty = qtyOverride !== null ? qtyOverride : quantity;

  const existingItem = cart.find(item => item.name === productName);

  if (existingItem) {
    existingItem.quantity += inputQty;
  } else {
    cart.push({ name: productName, price, quantity: inputQty });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  updateCartCount();
  showCartMessage(`${productName} added to cart!`);
}

// Update cart icon count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById('cart-count');

  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cartItemsContainer');
    const subtotalSpan = document.getElementById('cartSubtotal');
    const checkoutButton = document.getElementById('checkoutButton'); // Get the button
  
    container.innerHTML = '';
  
    if (cart.length === 0) {
      container.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
      subtotalSpan.textContent = '0 KWD';
  
      // Disable the checkout button if cart is empty
      if (checkoutButton) {
        checkoutButton.disabled = true;
        checkoutButton.classList.add('disabled'); // optional class for styling
      }
  
      return;
    }
  
    let subtotal = 0;
  
    cart.forEach((item, index) => {
      subtotal += item.price * item.quantity;
  
      const div = document.createElement('div');
      div.className = 'cart-item';
  
      div.innerHTML = `
        <img src="images/${item.name.toLowerCase().replace(/\s+/g, '')}.jpg" alt="${item.name}" class="cart-item-image" />
        <div class="cart-item-right">
          <div class="cart-item-text">
            <h4 class="cart-item-title">${item.name}</h4>
            <p class="cart-item-price">${item.price} KWD</p>
          </div>
  
          <div class="quantity-box">
            <button onclick="decreaseQuantityInCart(${index})">−</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQuantityInCart(${index})">+</button>
          </div>
  
          <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        </div>
      `;
  
      container.appendChild(div);
    });
  
    subtotalSpan.textContent = `${subtotal.toFixed(3)} KWD`;
  
    // Enable the checkout button when cart has items
    if (checkoutButton) {
      checkoutButton.disabled = false;
      checkoutButton.classList.remove('disabled'); // optional
    }
  }

// Increase quantity inside cart panel
function increaseQuantityInCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].quantity++;
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  updateCartCount();
}

// Decrease quantity inside cart panel
function decreaseQuantityInCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    updateCartCount();
  }
}

// Remove item from cart
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  updateCartCount();
}

// Go to checkout
function goToCheckout() {
  window.location.href = "checkout.html";
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateCartUI();
  updateQuantityDisplay(); // for product pages with quantity selectors
});