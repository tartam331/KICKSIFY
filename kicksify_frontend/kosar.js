// Termék hozzáadása a kosárhoz
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-cart')) {
        const cipo_id = event.target.dataset.id;
        const name = event.target.dataset.name;
        const price = parseFloat(event.target.dataset.price);

        fetch('http://localhost:5000/api/kosar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                felhasznalo_id: 1, // Ide a jelenleg bejelentkezett felhasználó ID-ja kerül
                cipo_id,
                darabszam: 1,
                egysegar: price
            })
        })
            .then(response => response.json())
            .then(data => {
                alert(`${name} added to cart!`);
            })
            .catch(error => console.error('Hiba a kosárhoz adás közben:', error));
    }
});

// Kosár tartalmának betöltése
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.cart-items')) {
        fetch('http://localhost:5000/api/kosar')
            .then(response => response.json())
            .then(data => {
                const cartItemsContainer = document.querySelector('.cart-items');
                const totalPriceEl = document.getElementById('total-price');
                let totalPrice = 0;

                cartItemsContainer.innerHTML = ''; // Kosár tartalmának törlése a betöltés előtt
                data.forEach(item => {
                    const div = document.createElement('div');
                    div.classList.add('cart-item');
                    div.innerHTML = `
                        ${item.name} x ${item.darabszam} - $${item.egysegar * item.darabszam}
                    `;
                    cartItemsContainer.appendChild(div);
                    totalPrice += item.egysegar * item.darabszam;
                });

                totalPriceEl.textContent = `Total: $${totalPrice.toFixed(2)}`;
            })
            .catch(error => console.error('Hiba a kosár tartalmának betöltése közben:', error));
    }
});
