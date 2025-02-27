document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const cipoId = urlParams.get("id");
  
    if (!cipoId) {
      document.getElementById("product-container").innerHTML = "<p>Hiba: Nem található a termék.</p>";
      return;
    }
  
    try {
      // Cipő adatok lekérése
      const resCipo = await fetch(`http://localhost:5000/api/cipok/${cipoId}`);
  
      if (!resCipo.ok) {
        console.error(`❌ API hiba: ${resCipo.status} - ${resCipo.statusText}`);
        document.getElementById("product-container").innerHTML = "<p>Ez a termék nem található.</p>";
        return;
      }
  
      const responseText = await resCipo.text();
      
      // Ellenőrizzük, hogy valóban JSON-e az adat
      let shoe;
      try {
        shoe = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("❌ JSON hiba, nem megfelelő válasz az API-tól:", responseText);
        document.getElementById("product-container").innerHTML = "<p>Hiba történt az adatok betöltésekor.</p>";
        return;
      }
  
      console.log("✅ Betöltött cipő adatok:", shoe);
  
      renderShoeDetails(shoe);
    } catch (err) {
      console.error("❌ Hiba a termék betöltésekor:", err);
    }
  });
  
  /**
   * Cipő részleteinek megjelenítése
   */
  function renderShoeDetails(shoe) {
    const galleryContainer = document.getElementById("shoe-gallery");
    const sizeContainer = document.getElementById("size-options");
  
    // **Képek kezelése** → több kép esetén vesszővel elválasztott stringből tömb
    const imageFiles = shoe.kep.split(",").map(img => img.trim());
    console.log("🔍 Cipő képek:", imageFiles);
  
    galleryContainer.innerHTML = "";
    imageFiles.forEach(imgFile => {
      const imgSrc = `http://localhost:5000/cipok/${imgFile}`;
      const imgElement = document.createElement("img");
      imgElement.src = imgSrc;
      imgElement.alt = shoe.modell;
      imgElement.onerror = () => { imgElement.src = "images/default-image.jpg"; };
      galleryContainer.appendChild(imgElement);
    });
  
    document.getElementById("product-brand").textContent = shoe.marka;
    document.getElementById("product-name").textContent = shoe.modell;
    document.getElementById("product-price").textContent = `${Number(shoe.ar).toLocaleString("hu-HU")} Ft`;
  
    // **Méretek kezelése** → ha vannak, tömbbé alakítjuk
    const sizes = shoe.meretek ? shoe.meretek.split(",").map(size => size.trim()) : [];
    sizeContainer.innerHTML = sizes.length > 0 
      ? sizes.map(size => `<button class="size-option">${size}</button>`).join("")
      : "<p>Nincs elérhető méret.</p>";
  
    // Méret kiválasztása
    document.querySelectorAll(".size-option").forEach(button => {
      button.addEventListener("click", function () {
        document.querySelectorAll(".size-option").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
      });
    });
  }
  