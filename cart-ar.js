// cart-ar.js

localStorage.removeItem('cart');

const cartPanel = document.getElementById('cartPanel');
const overlay = document.getElementById('overlay');
let quantity = 1;

function toggleCart() {
  cartPanel.classList.toggle('open');
  overlay.classList.toggle('active');
}

function showCartMessage(message) {
  const msgBox = document.getElementById('cart-message');
  msgBox.textContent = message;
  msgBox.classList.add('show');
  setTimeout(() => msgBox.classList.remove('show'), 2000);
}

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
  showCartMessage(`تمت إضافة ${productName} إلى السلة!`);
}

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
  const checkoutButton = document.getElementById('checkoutButton');

  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-cart">سلتك فارغة.</p>';
    subtotalSpan.textContent = '0.000 د.ك';

    if (checkoutButton) {
      checkoutButton.disabled = true;
      checkoutButton.classList.add('disabled');
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
          <p class="cart-item-price">${item.price} د.ك</p>
        </div>

        <div class="quantity-box">
          <button onclick="decreaseQuantityInCart(${index})">−</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantityInCart(${index})">+</button>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">حذف</button>
      </div>
    `;

    container.appendChild(div);
  });

  subtotalSpan.textContent = `${subtotal.toFixed(3)} د.ك`;

  if (checkoutButton) {
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
  }
}

function increaseQuantityInCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].quantity++;
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  updateCartCount();
}

function decreaseQuantityInCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    updateCartCount();
  }
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  updateCartCount();
}

function goToCheckout() {
  window.location.href = "checkout-ar.html";
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateCartUI();
  updateQuantityDisplay();
});