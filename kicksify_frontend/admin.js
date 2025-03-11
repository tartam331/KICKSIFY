document.addEventListener("DOMContentLoaded", function () {
    // Egyéb adatok betöltése, például termékek, dashboard statisztikák, stb.
    fetch("http://localhost:5000/products")
        .then(response => response.json())
        .then(data => {
            document.getElementById("orderCount").innerText = data.length;
            let productList = document.getElementById("productList");
            data.forEach(product => {
                let li = document.createElement("li");
                li.textContent = product.name;
                productList.appendChild(li);
            });
        })
        .catch(error => console.error("Hiba a termékek lekérésekor:", error));
});

// Függvény, amely lekéri és megjeleníti a felhasználókat (most: "felhasznalok")
function loadUsers() {
    fetch("http://localhost:5000/felhasznalok")
        .then(response => response.json())
        .then(data => {
            // Frissítjük a felhasználók számát
            document.getElementById("userCount").innerText = data.length;
            let userList = document.getElementById("userList");
            // Korábbi lista tartalom törlése
            userList.innerHTML = "";
            
            data.forEach(user => {
                let li = document.createElement("li");
                
                // Felhasználó neve
                let nameSpan = document.createElement("span");
                nameSpan.textContent = user.name + " ";
                li.appendChild(nameSpan);
                
                // Admin státusz megjelenítése
                let statusSpan = document.createElement("span");
                statusSpan.textContent = user.is_admin ? "(Admin)" : "(Nem admin)";
                li.appendChild(statusSpan);
                
                // Gomb az admin jogosultság módosításához
                let toggleButton = document.createElement("button");
                toggleButton.style.marginLeft = "15px";
                toggleButton.textContent = user.is_admin ? "Eltávolít admin jogot" : "Ad admin jogot";
                toggleButton.addEventListener("click", () => {
                    // PUT kérés a felhasználó admin státuszának módosításához
                    fetch(`http://localhost:5000/felhasznalok/${user.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ is_admin: !user.is_admin })
                    })
                    .then(response => response.json())
                    .then(updatedUser => {
                        // Frissítjük a sor tartalmát az új adatokkal
                        user.is_admin = updatedUser.is_admin;
                        statusSpan.textContent = updatedUser.is_admin ? "(Admin)" : "(Nem admin)";
                        toggleButton.textContent = updatedUser.is_admin ? "Eltávolít admin jogot" : "Ad admin jogot";
                    })
                    .catch(error => console.error("Hiba történt:", error));
                });
                
                li.appendChild(toggleButton);
                userList.appendChild(li);
            });
        })
        .catch(error => console.error("Hiba a felhasználók lekérésekor:", error));
}

// Oldalváltás kezelése: amikor egy adott szekció láthatóvá válik,
// ha az a 'users' (Felhasználók Kezelése) oldal, akkor frissítjük a felhasználók listáját.
function showPage(page) {
    document.querySelectorAll(".admin-section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(page).style.display = "block";
    
    if(page === 'users') {
        loadUsers();
    }
}
