document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/api/cipok")
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById("product-list");
            productList.innerHTML = ""; // Töröljük a korábbi tartalmat

            data.forEach(product => {
                productList.innerHTML += `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${product.image}" class="card-img-top" alt="${product.modell}">
                            <div class="card-body">
                                <h5 class="card-title">${product.marka} - ${product.modell}</h5>
                                <p class="card-text">${product.leiras}</p>
                                <p class="card-text"><strong>${product.ar} HUF</strong></p>
                                <button class="btn btn-primary" onclick="addToCart(${product.cipo_id}, ${product.ar})">Kosárba</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error("❌ Hiba a termékek betöltésekor:", error);
        });
});

// 🛒 Kosárhoz adás funkció
const addToCart = (cipo_id, ar) => {
    fetch("http://localhost:5000/api/kosar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            felhasznalo_id: 1, // Ezt dinamikusan kellene beállítani egy bejelentkezett felhasználónál
            cipo_id: cipo_id,
            darabszam: 1,
            egysegar: ar
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("✅ Hozzáadva a kosárhoz:", data);
        } else {
            console.error("❌ Hiba a kosárhoz adáskor:", data.error);
        }
    })
    .catch(error => console.error("❌ Hiba kosárhoz adáskor:", error));
};

// 📝 Regisztráció funkció
const registerUser = (user) => {
    fetch("http://localhost:5000/api/felhasznalok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("✅ Sikeres regisztráció:", data);
        } else {
            console.error("❌ Hiba regisztrációkor:", data.error);
        }
    })
    .catch(error => console.error("❌ Hiba regisztrációkor:", error));
};

// Példa regisztráció
registerUser({
    vezeteknev: "Kiss",
    keresztnev: "János",
    email: "janos.kiss@example.com",
    jelszo_hash: "hashedpassword123"
});

// 🏀 Nike cipők megjelenítése
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:5000/api/cipok?marka=Nike")
        .then(response => response.json())
        .then(data => {
            const shoeContainer = document.querySelector(".shoe-container");
            shoeContainer.innerHTML = ""; // Tisztítás

            let row;
            data.forEach((shoe, index) => {
                if (index % 3 === 0) {
                    row = document.createElement("div");
                    row.classList.add("shoe-row");
                    shoeContainer.appendChild(row);
                }

                const shoeCard = document.createElement("div");
                shoeCard.classList.add("shoe-card");

                shoeCard.innerHTML = `
                    <img src="${shoe.image}" alt="${shoe.modell}">
                    <h2>${shoe.modell}</h2>
                    <p>Ár: ${shoe.ar} Ft</p>
                    <p>Méret: ${shoe.meret}</p>
                `;

                row.appendChild(shoeCard);
            });
        })
        .catch(error => console.error("❌ Hiba történt az adatok betöltésekor:", error));
});

const cipo = {
    ...results[0],
    image: `http://localhost:5000/cipok/${results[0].kep}`
};
