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
        // Feltételezzük, hogy az oldalon valahol elérhetőek a következők:
        const cipoId = document.getElementById("cipoId").value; 
        const marka = document.getElementById("product-brand").textContent;
        const modell = document.getElementById("product-name").textContent;
        const meret = document.getElementById("selected-size").textContent;
        const darabszam = parseInt(document.getElementById("quantity").value, 10) || 1;
  
        // Ár kinyerése pl. "54 990 Ft" -> 54990
        const arSzoveg = document.getElementById("product-price").textContent;
        const ar = parseInt(arSzoveg.replace(/\D/g, ""), 10);
  
        // Opcionálisan a fő kép (ha kell a kosárban)
        const kepUrl = document.getElementById("main-image").src;
  
        const ujTermek = {
          cipo_id: parseInt(cipoId, 10),
          marka,
          modell,
          meret: parseInt(meret, 10), // ha float, akkor parseFloat
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
  