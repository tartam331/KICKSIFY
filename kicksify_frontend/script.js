document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/cipok')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Clear previous content
            data.forEach(product => {
                productList.innerHTML += `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="images/${product.marka.toLowerCase()}.png" class="card-img-top" alt="${product.modell}">
                            <div class="card-body">
                                <h5 class="card-title">${product.marka} - ${product.modell}</h5>
                                <p class="card-text">${product.leiras}</p>
                                <p class="card-text"><strong>${product.ar} HUF</strong></p>
                                <button class="btn btn-primary">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
});

app.get('/api/cipok', (req, res) => {
    const query = 'SELECT * FROM cipok';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching products.');
            return;
        }
        res.json(results);
    });
});

fetch('http://localhost:3000/api/cipok')
    .then(response => response.json())
    .then(data => {
        console.log('Cipők:', data);
        // Itt megjelenítheted a termékeket a frontendben
    })
    .catch(error => console.error('Hiba a termékek betöltésekor:', error));

    const registerUser = (user) => {
        fetch('http://localhost:3000/api/felhasznalok', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Sikeres regisztráció:', data);
            }
        })
        .catch(error => console.error('Hiba regisztrációkor:', error));
    };
    
    // Példa:
    registerUser({
        vezeteknev: 'Kiss',
        keresztnev: 'János',
        email: 'janos.kiss@example.com',
        jelszo_hash: 'hashedpassword123'
    });

    const addToCart = (item) => {
        fetch('http://localhost:3000/api/kosar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Hozzáadva a kosárhoz:', data);
            }
        })
        .catch(error => console.error('Hiba kosárhoz hozzáadáskor:', error));
    };
    
    // Példa:
    addToCart({
        felhasznalo_id: 1,
        cipo_id: 3,
        darabszam: 2,
        egysegar: 15000
    });
    
    db.connect(err => {
        if (err) {
            console.error('Database connection failed:', err); // Naplózd a hibát
            return;
        }
        console.log('Connected to MySQL database');
    });


    document.addEventListener("DOMContentLoaded", function () {
        fetch("http://localhost:5000/nike-dunks")
            .then(response => response.json())
            .then(data => {
                const shoeContainer = document.querySelector(".shoe-container");
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
                        <img src="${shoe.image_url}" alt="${shoe.model}">
                        <h2>${shoe.model}</h2>
                        <p>Ár: ${shoe.price} Ft</p>
                        <p>Méret: ${shoe.size}</p>
                    `;
    
                    row.appendChild(shoeCard);
                });
            })
            .catch(error => console.error("Hiba történt az adatok betöltésekor:", error));
    });
    


 