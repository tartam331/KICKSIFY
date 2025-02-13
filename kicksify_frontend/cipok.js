// Cipők betöltése a backendről
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.shoes')) {
        fetch('http://localhost:5000/api/cipok')
            .then(response => response.json())
            .then(data => {
                const shoesContainer = document.querySelector('.shoes');
                shoesContainer.innerHTML = ''; // Törli az előzőleg betöltött elemeket
                data.forEach(shoe => {
                    const shoeDiv = document.createElement('div');
                    shoeDiv.classList.add('shoe');
                    shoeDiv.innerHTML = `
                        <img src="images/${shoe.marka.toLowerCase()}.png" alt="${shoe.marka}">
                        <h3>${shoe.marka} ${shoe.modell}</h3>
                        <p>Price: $${shoe.ar}</p>
                        <button class="add-to-cart" data-id="${shoe.cipo_id}" data-name="${shoe.marka} ${shoe.modell}" data-price="${shoe.ar}">Add to Cart</button>
                    `;
                    shoesContainer.appendChild(shoeDiv);
                });
            })
            .catch(error => console.error('Hiba a cipők betöltése közben:', error));
    }
});

document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.shoes')) {
        const shoesContainer = document.querySelector('.shoes');

        // IDEIGLENES TERMÉKLISTA (Backend nélkül működik)
        const fakeShoes = [
            { id: 1, marka: 'Nike', modell: 'Air Max', ar: 120, kep: 'images/nike.png' },
            { id: 2, marka: 'Adidas', modell: 'Ultraboost', ar: 150, kep: 'images/adidas.png' },
            { id: 3, marka: 'Balenciaga', modell: 'Speed Trainer', ar: 650, kep: 'images/balenciaga.png' }
        ];

        shoesContainer.innerHTML = ''; // Előző tartalom törlése
        fakeShoes.forEach(shoe => {
            const shoeDiv = document.createElement('div');
            shoeDiv.classList.add('shoe');
            shoeDiv.innerHTML = `
                <img src="${shoe.kep}" alt="${shoe.marka}">
                <h3>${shoe.marka} ${shoe.modell}</h3>
                <p>Price: $${shoe.ar}</p>
                <button class="add-to-cart" data-id="${shoe.id}" data-name="${shoe.marka} ${shoe.modell}" data-price="${shoe.ar}">Add to Cart</button>
            `;
            shoesContainer.appendChild(shoeDiv);
        });
    }
});
