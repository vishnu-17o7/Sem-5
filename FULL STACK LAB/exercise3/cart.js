document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function populateCart() {
        const cartTableBody = document.querySelector("#cart-table tbody");
        cartTableBody.innerHTML = ""; 

        cart.forEach((item, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.title}</td>
                <td>Rs ${item.price}</td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
                <td>Rs ${item.price * item.quantity}</td>
                <td><button onclick="removeFromCart(${index})">Remove</button></td>
            `;

            cartTableBody.appendChild(row);
        });

        updateTotalAmount();
    }

    window.updateQuantity = function(index, quantity) {
        cart[index].quantity = parseInt(quantity);
        updateCartStorage();
        populateCart();
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartStorage();
        populateCart();
    }

    function updateTotalAmount() {
        const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        document.getElementById("total-amount").innerText = `Total Amount: Rs ${totalAmount}`;
    }

    function updateCartStorage() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    window.handleCheckout = function() {
        const checkoutBtn = document.getElementById("checkout-btn");
        checkoutBtn.innerHTML = "Loading...";
        checkoutBtn.disabled = true;
        checkoutBtn.classList.add("loading");

        // Change button color to alert color
        checkoutBtn.style.backgroundColor = "red";

        setTimeout(function() {
            checkoutBtn.innerHTML = "Checkout";
            checkoutBtn.disabled = false;
            checkoutBtn.classList.remove("loading");
            checkoutBtn.style.backgroundColor = ""; // Reset button color

            // Clear cart after checkout
            cart = [];
            updateCartStorage();
            populateCart();
            alert("Checkout completed successfully!");
        }, 2000);
    }

    populateCart();
});
