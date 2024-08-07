document.addEventListener("DOMContentLoaded", function() {
    let catalogue = JSON.parse(localStorage.getItem("catalogue")) || [
        { cover: "xml_bible.jpg", title: "XML Bible", author: "Winston", publisher: "Wiley", price: 40.5 },
        { cover: "ai.jpg", title: "AI", author: "S. Russell", publisher: "Princeton Hall", price: 63 },
        { cover: "java_2.jpg", title: "Java 2", author: "Watson", publisher: "BPB Publications", price: 35.5 },
        { cover: "html_24_hours.jpg", title: "HTML in 24 Hours", author: "Sam Peter", publisher: "Sam Publication", price: 50 }
    ];

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    function populateCatalogue() {
        const catalogueTableBody = document.querySelector("#catalogue-table tbody");
        catalogueTableBody.innerHTML = ""; // Clear existing rows

        catalogue.forEach((book, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td><img src="${book.cover}" alt="${book.title}"></td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.publisher}</td>
                <td>Rs ${book.price}</td>
                <td><button onclick="addToCart(${index})">Add to Cart</button></td>
            `;
            catalogueTableBody.appendChild(row);
        });
    }

    window.addToCart = function(index) {
        const book = catalogue[index];
        const cartItem = cart.find(item => item.title === book.title);

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...book, quantity: 1 });
        }

        updateCartStorage();
        alert(`${book.title} added to cart.`);
    }
    function updateCartStorage() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    populateCatalogue();
});
