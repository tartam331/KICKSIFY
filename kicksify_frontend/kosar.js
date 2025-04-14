// kosar.js

// A kosárban minden elem így nézzen ki:
// {
//   cipo_id: 123,
//   marka: "Nike",
//   modell: "SB Dunk Low ...",
//   meret: 42,
//   darabszam: 1,
//   ar: 54990,
//   kep: "valami.jpg"   // (opcionális, ha szeretnénk a képet is tárolni a kosárban)
//   // ... bármilyen egyéb mező, ami kell
// }

function kosarBetoltese() {
    const kosarAdatok = localStorage.getItem("kosar");
    return kosarAdatok ? JSON.parse(kosarAdatok) : [];
  }
  
  function kosarMentese(kosar) {
    localStorage.setItem("kosar", JSON.stringify(kosar));
  }
  
  function kosarhozHozzaad(ujElem) {
    const kosar = kosarBetoltese();
  
    // Megnézzük, van-e már ugyanez a cipo_id + méret a kosárban
    const index = kosar.findIndex(
      (termek) => termek.cipo_id === ujElem.cipo_id && termek.meret === ujElem.meret
    );
    
    if (index > -1) {
      // Ha létezik, növeljük a darabszámot
      kosar[index].darabszam += ujElem.darabszam;
    } else {
      // Egyébként új elemként hozzáadjuk
      kosar.push(ujElem);
    }
  
    kosarMentese(kosar);
  }
  
  function kosarMegjelenitese() {
    const kosar = kosarBetoltese();
    const kontener = document.getElementById("kosarTartalom");
    if (!kontener) return; // Ha nincs ilyen elem az oldalon, lépjünk ki
  
    kontener.innerHTML = "";
    if (kosar.length === 0) {
      kontener.innerHTML = "<p>A kosár üres.</p>";
      return;
    }
  
    kosar.forEach((item) => {
      // Itt pl. felsoroljuk a termékeket
      // Igény szerint CSS-sel, HTML-gyel szépen formázható
      const div = document.createElement("div");
      div.innerHTML = `
        <strong>${item.marka} ${item.modell}</strong>
        - Méret: ${item.meret}
        - Darabszám: ${item.darabszam}
        - Ár: ${item.ar} Ft
      `;
      kontener.appendChild(div);
    });
  }
  
  // Eseménykezelő: a "Kosárba" gomb (példa)
  document.addEventListener("DOMContentLoaded", function () {
    const addToCartBtn = document.getElementById("addToCartBtn");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", function () {
        // Próbáljuk meg először a "cipoId" elemet, ha nem találjuk, akkor "exkluzivId"-t
        let productIdElem = document.getElementById("cipoId");
        if (!productIdElem) {
          productIdElem = document.getElementById("exkluzivId");
        }
        if (!productIdElem) {
          console.error("A termék azonosító elem (cipoId vagy exkluzivId) nem található!");
          return;
        }
        const productId = productIdElem.value || productIdElem.textContent;
        
        const markaElem = document.getElementById("product-brand");
        const modellElem = document.getElementById("product-name");
        const sizeElem = document.getElementById("selected-size");
        const quantityElem = document.getElementById("quantity");
        const priceElem = document.getElementById("product-price");
        const mainImageElem = document.getElementById("main-image");
    
        if (!markaElem || !modellElem || !sizeElem || !quantityElem || !priceElem || !mainImageElem) {
          console.error("Egy vagy több termék adat elem nem található!");
          return;
        }
    
        const marka = markaElem.textContent;
        const modell = modellElem.textContent;
        const meret = sizeElem.textContent;
        const darabszam = parseInt(quantityElem.value, 10) || 1;
    
        // Ár kinyerése pl. "54 990 Ft" -> 54990
        const arSzoveg = priceElem.textContent;
        const ar = parseInt(arSzoveg.replace(/\D/g, ""), 10);
    
        const kepUrl = mainImageElem.src;
    
        const ujTermek = {
          cipo_id: parseInt(productId, 10),
          marka,
          modell,
          meret: parseInt(meret, 10),
          darabszam,
          ar,
          kep: kepUrl
        };
    
        kosarhozHozzaad(ujTermek);
        alert("Termék hozzáadva a kosárhoz!");
        kosarMegjelenitese();
      });
    }
  });
  