const loadBtn = document.getElementById("load-products-btn");

// Gestion du clic : Load / Clear
loadBtn.addEventListener("click", () => {
    const container = document.getElementById("product-list");

    if (loadBtn.dataset.state === "loaded") {
        // vider les produits
        container.innerHTML = "";
        loadBtn.textContent = "Load Products";
        loadBtn.dataset.state = "load";
        return;
    }

    // charger les produits depuis l'API
    fetch("https://dummyjson.com/products")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors du chargement du JSON distant");
            }
            return response.json();
        })
        .then(data => {
            const products = data.products;
            container.innerHTML = "";

            products.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product-item");

                productDiv.innerHTML = `
                    <img src="${product.images[0]}" alt="${product.title}">
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <p>${product.description}</p>
                        <p class="product-price">$${product.price}</p>
                        <a href="#" class="btn">Add to Cart</a>
                    </div>
                `;

                container.appendChild(productDiv);
            });

            // changer le bouton pour Clear
            loadBtn.textContent = "Clear Products";
            loadBtn.dataset.state = "loaded";
        })
        .catch(error => {
            console.error("Erreur :", error);
            container.innerHTML = "<p>Erreur lors du chargement des produits.</p>";
        });
});