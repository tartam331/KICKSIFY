document.addEventListener("DOMContentLoaded", function() {
    // Kiolvassuk az URL-ből a cipő ID-ját: pl. product.html?id=37
    const urlParams = new URLSearchParams(window.location.search);
    const cipoId = urlParams.get("id");
  
    if (!cipoId) {
      // Ha nincs id, írjunk ki hibaüzenetet
      document.querySelector(".product-page").innerHTML = "<p>Hiányzó termékazonosító.</p>";
      return;
    }
  
    // Lekérjük a /api/cipok/:id végpontot (vagy /api/cipok?cipo_id=..)
    fetch(`/api/cipok/${cipoId}`)
      .then(function(response) {
        if (!response.ok) {
          throw new Error("HTTP error: " + response.status);
        }
        return response.json();
      })
      .then(function(cip) {
        // Ha a szerver egy objektumot ad vissza
        // (Ha tömböt, akkor cip[0] kellhet)
        if (!cip || !cip.cipo_id) {
          document.querySelector(".product-page").innerHTML = "<p>A termék nem található.</p>";
          return;
        }
  
        // Kitöltjük az adatokat
        document.getElementById("product-image").src = "/images/" + cip.kep;
        document.getElementById("product-image").alt = cip.modell;
        document.getElementById("product-brand").textContent = cip.marka;
        document.getElementById("product-name").textContent = cip.modell;
        
        const arFormazott = Number(cip.ar).toLocaleString("hu-HU") + " Ft";
        document.getElementById("product-price").textContent = arFormazott;
  
        // Példa fix méretsor (a screenshot alapján)
        const meretek = ["30","31","31.5","32","33","33.5","34","35"];
        const sizeOptionsContainer = document.getElementById("size-options");
        sizeOptionsContainer.innerHTML = "";
        meretek.forEach(function(m) {
          const span = document.createElement("span");
          span.className = "size-option";
          span.textContent = m;
          // Kattintásra kijelölés logika
          span.onclick = function() {
            // Kiüthetjük az aktív stílust
            document.querySelectorAll(".size-option").forEach(s => s.style.borderColor = "#ccc");
            span.style.borderColor = "#000";
          };
          sizeOptionsContainer.appendChild(span);
        });
  
        // Kosárba gomb
        document.getElementById("addToCartBtn").onclick = function() {
          const quantity = parseInt(document.getElementById("quantity").value, 10) || 1;
          alert(cip.marka + " " + cip.modell + " hozzáadva a kosárhoz, darabszám: " + quantity);
          // Itt fetch POST /api/kosar, stb.
        };
      })
      .catch(function(error) {
        console.error("Hiba a termék betöltésekor:", error);
        document.querySelector(".product-page").innerHTML = "<p>Hiba történt a termék betöltésekor.</p>";
      });
  });
  