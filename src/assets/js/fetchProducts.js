fetch("../../data/products.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors du chargement du JSON");
        }
        return response.json();
    })
    .then(products => {
        const container = document.getElementById("product-list");

        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product-item");

            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="product-price">$${product.price}</p>
                    <a href="#" class="btn">Add to Cart</a>
                </div>
            `;

            container.appendChild(productDiv);
        });
    })
    .catch(error => {
        console.error("Erreur :", error);
    });