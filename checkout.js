// Checkout script
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCheckout() {
  const itemsContainer = document.getElementById('checkout-items');
  const totalEl = document.getElementById('checkout-total');
  
  if (cart.length === 0) {
    itemsContainer.innerHTML = '<p style="text-align: center; opacity: 0.7;">No items in cart. <a href="index.html">Continue Shopping</a></p>';
    document.getElementById('checkout-form').style.display = 'none';
    return;
  }
  
  itemsContainer.innerHTML = cart.map(item => `
    <div style="display: flex; justify-content: space-between; margin: 10px 0; padding: 10px; border-bottom: 1px solid #333;">
      <span>${item.name} x${item.quantity}</span>
      <span>$${ (item.price * item.quantity).toFixed(2) }</span>
    </div>
  `).join('');
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  totalEl.textContent = total.toFixed(2);
}

// Form submit
document.getElementById('checkout-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Fake processing
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Processing...';
  btn.disabled = true;
  
  setTimeout(() => {
    localStorage.removeItem('cart');
    alert('Order placed successfully! Thank you for your purchase. Your cyberdeck will ship within 3-5 days. Check your email for confirmation.');
    window.location.href = 'index.html';
  }, 2000);
});

// Init
document.addEventListener('DOMContentLoaded', renderCheckout);