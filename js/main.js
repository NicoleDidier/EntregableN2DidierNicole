// Función para agregar un elemento al carrito
function addToCart(productName, price) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const quantity = parseInt(document.querySelector('.quantity').value);

  if (quantity > 0) {
    // Verificar si el producto ya existe en el carrito
    const existingIndex = cartItems.findIndex(item => item.productName === productName);
    
    if (existingIndex !== -1) {
      // Si el producto ya existe, actualizar la cantidad
      cartItems[existingIndex].quantity += quantity;
    } else {
      // Si el producto no existe, agregarlo al carrito
      cartItems.push({ productName, price, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartUI();
  } else {
    alert('Debes agregar al menos 1 producto al carrito.');
  }
}


// Función para eliminar un producto del carrito
  function removeFromCart(index) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartUI();
  }
  
  // Función para vaciar el carrito
  function clearCart() {
    localStorage.removeItem('cart');
    updateCartUI();
  }
  
  // Función para actualizar el carrito en la interfaz
  function updateCartUI() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';
  
    cartItems.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.productName} - Cantidad: ${item.quantity} - Precio: $${item.price * item.quantity}`; // Mostramos la cantidad y el precio total
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Eliminar';
      removeButton.onclick = () => removeFromCart(index);
      listItem.appendChild(removeButton);
      cartList.appendChild(listItem);
    });
  }
  
  
  // Función para finalizar la compra
function checkout() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Aquí puedes procesar los datos de la compra, enviarlos a un servidor, etc.
  
    // Vaciar el carrito después de la compra
    clearCart();
  
    // Mostrar el mensaje de agradecimiento
    const thankYouMessage = document.getElementById('thank-you-message');
    thankYouMessage.style.display = 'block';
  }
  
  // Actualizar el carrito al cargar la página
  updateCartUI();