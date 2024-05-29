document.addEventListener('DOMContentLoaded', function() {
    let cart = []; 
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const subTotalElement = document.getElementById('sub-total');
    const clearCartButton = document.querySelector('.clear-cart'); 

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productRow = this.closest('.cart-item');
            const quantityInput = productRow.querySelector('input[type="number"]');
            const quantity = parseInt(quantityInput.value, 10);
            if (quantity <= 0) {
                alert('Proszę wybrać przynajmniej jeden produkt.');
                return; 
            }
            const priceElement = productRow.querySelector('.product-price').parentNode;
            const priceText = priceElement.textContent.trim();
            const price = parseFloat(priceText.replace('PLN', '').replace(',', '.'));
            if (!isNaN(price)) {
                const totalPrice = price * quantity;
                cart.push(totalPrice);
                updateSubTotal();
            }
        });
    });

    function updateSubTotal() {
        const total = cart.reduce((acc, price) => acc + price, 0);
        subTotalElement.textContent = total.toFixed(2) + ' PLN'; 
    }

    const checkoutButton = document.querySelector('.check-out');
    checkoutButton.addEventListener('click', function() {
        if (cart.length > 0) {
            alert('Dziękujemy za zakupy! Do zapłaty: PLN ' + subTotalElement.textContent);
        } else {
            alert('Twój koszyk jest pusty.');
        }
    });


    clearCartButton.addEventListener('click', function() {
        cart = []; 
        updateSubTotal(); 
        alert('Koszyk został wyczyszczony.');
    });
});