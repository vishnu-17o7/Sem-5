document.addEventListener("DOMContentLoaded", function() {
    let catalogue = JSON.parse(localStorage.getItem("catalogue")) || [
        { cover: "xml_bible.jpg", title: "XML Bible", author: "Winston", publisher: "Wiley", price: 40.5 },
        { cover: "ai.jpg", title: "AI", author: "S. Russell", publisher: "Princeton Hall", price: 63 },
        { cover: "java_2.jpg", title: "Java 2", author: "Watson", publisher: "BPB Publications", price: 35.5 },
        { cover: "html_24_hours.jpg", title: "HTML in 24 Hours", author: "Sam Peter", publisher: "Sam Publication", price: 50 }
    ];

    function populateAdminCatalogue() {
        const adminCatalogueTableBody = document.querySelector("#admin-catalogue-table tbody");
        adminCatalogueTableBody.innerHTML = ""; // Clear existing rows

        catalogue.forEach((book, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td><img src="${book.cover}" alt="${book.title}"></td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.publisher}</td>
                <td>Rs ${book.price}</td>
                <td>
                    <button onclick="editBook(${index})">Edit</button>
                    <button onclick="deleteBook(${index})">Delete</button>
                </td>
            `;
            adminCatalogueTableBody.appendChild(row);
        });
    }

    window.editBook = function(index) {
        const book = catalogue[index];
        document.getElementById("book-index").value = index;
        document.getElementById("cover").value = book.cover;
        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("publisher").value = book.publisher;
        document.getElementById("price").value = book.price;
    }

    window.deleteBook = function(index) {
        catalogue.splice(index, 1);
        updateCatalogueStorage();
        populateAdminCatalogue();
    }

    function updateCatalogueStorage() {
        localStorage.setItem("catalogue", JSON.stringify(catalogue));
    }

    document.getElementById("book-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const index = document.getElementById("book-index").value;
        const book = {
            cover: document.getElementById("cover").value,
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            publisher: document.getElementById("publisher").value,
            price: parseFloat(document.getElementById("price").value)
        };

        if (index) {
            catalogue[index] = book;
        } else {
            catalogue.push(book);
        }

        updateCatalogueStorage();
        populateAdminCatalogue();
        this.reset();
        document.getElementById("book-index").value = "";
    });

    populateAdminCatalogue();
});
