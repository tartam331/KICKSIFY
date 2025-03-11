const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// Adatbázis kapcsolat beállítása
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "kicksify",
  port: process.env.DB_PORT || 3307
});
  


 























// Adatbázis kapcsolódás kezelése
db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL Database");
});

// Cipők képeinek kiszolgálása (images mappa) – statikus
app.use("/images", express.static(path.join(__dirname, "images")));

// Összes cipő lekérése méretekkel együtt
app.get("/api/cipok", (req, res) => {
  let query = `
    SELECT c.*, GROUP_CONCAT(m.meret ORDER BY m.meret ASC) AS meretek
    FROM cipok c
    LEFT JOIN meretek m ON c.cipo_id = m.cipo_id
  `;
  if (req.query.marka) {
    query += " WHERE c.marka = " + mysql.escape(req.query.marka);
  }
  query += " GROUP BY c.cipo_id";

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ API hiba:", err);
      return res.status(500).json({ error: "Hiba az adatbázis lekérdezésekor" });
    }

    // Visszaadjuk az összes cipőt (a front-end jelenleg a képfájl(oka)t is magából a 'kep' mezőből kezeli, vesszővel elválasztva)
    res.json(results);
  });
});

// Egy adott cipő lekérése méretekkel együtt
app.get("/api/cipok/:id", (req, res) => {
  const cipoId = req.params.id;
  const query = `
    SELECT c.*, GROUP_CONCAT(m.meret ORDER BY m.meret ASC) AS meretek
    FROM cipok c
    LEFT JOIN meretek m ON c.cipo_id = m.cipo_id
    WHERE c.cipo_id = ?
    GROUP BY c.cipo_id
  `;
  db.query(query, [cipoId], (err, results) => {
    if (err) {
      console.error("❌ Adatbázis hiba:", err);
      return res.status(500).json({ error: "Adatbázis hiba" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Nincs ilyen termék" });
    }

    // Itt is a 'kep' mező vesszővel elválasztott string, a front-endből dolgozzuk fel
    res.json(results[0]);
  });
});

// Új végpont: adott cipő árváltozásainak lekérése
app.get("/api/cipok/:id/arvaltozas", (req, res) => {
  const cipoId = req.params.id;
  // Feltételezzük, hogy van egy 'arvaltozas' tábla: (id, cipo_id, datum, ar)
  // Ez tárolja az árakat és a változások dátumát
  const query = "SELECT datum, ar FROM arvaltozas WHERE cipo_id = ? ORDER BY datum ASC";
  db.query(query, [cipoId], (err, results) => {
    if (err) {
      console.error("❌ Ár változás lekérdezési hiba:", err);
      return res.status(500).json({ error: "Hiba az ár történet lekérdezésekor" });
    }
    res.json(results);
  });
});

// Új végpont: Cipő méretek lekérése (ha front-end külön használja)
app.get("/api/cipok/:id/meretek", (req, res) => {
  const cipoId = req.params.id;
  const query = "SELECT meret FROM meretek WHERE cipo_id = ?";
  db.query(query, [cipoId], (err, results) => {
    if (err) {
      console.error("❌ Méretek lekérdezési hiba:", err);
      return res.status(500).json({ error: "Adatbázis hiba" });
    }
    res.json(results);
  });
});

// Kosár funkciók, felhasználók és egyebek
// --------------------------------------
// Kosárba adás
app.post("/api/kosar", (req, res) => {
  const { felhasznalo_id, cipo_id, meret, darabszam, egysegar } = req.body;
  if (!felhasznalo_id || !cipo_id || !meret || !darabszam || !egysegar) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }
  const query =
    "INSERT INTO kosar (felhasznalo_id, cipo_id, meret, darabszam, egysegar) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [felhasznalo_id, cipo_id, meret, darabszam, egysegar], (err) => {
    if (err) {
      console.error("❌ Kosár hiba:", err);
      return res.status(500).json({ error: "Hiba a kosárba adáskor" });
    }
    res.json({ success: true, message: "Termék hozzáadva a kosárhoz" });
  });
});

// Kosár lekérése felhasználó alapján
app.get("/api/kosar/:felhasznalo_id", (req, res) => {
  const felhasznalo_id = req.params.felhasznalo_id;
  const query = `
    SELECT k.*, c.marka, c.modell, c.kep
    FROM kosar k
    JOIN cipok c ON k.cipo_id = c.cipo_id
    WHERE k.felhasznalo_id = ?
  `;
  db.query(query, [felhasznalo_id], (err, results) => {
    if (err) {
      console.error("❌ Kosár lekérdezési hiba:", err);
      return res.status(500).json({ error: "Hiba a kosár lekérdezésekor" });
    }
    res.json(results);
  });
});

// Kosárból termék eltávolítása
app.delete("/api/kosar/:id", (req, res) => {
  const kosarId = req.params.id;
  const query = "DELETE FROM kosar WHERE kosar_id = ?";
  db.query(query, [kosarId], (err) => {
    if (err) {
      console.error("❌ Hiba a törlés során:", err);
      return res.status(500).json({ error: "Nem sikerült törölni a kosárból" });
    }
    res.json({ success: true, message: "Termék eltávolítva a kosárból" });
  });
});

// Bejelentkezés
app.post("/api/felhasznalok/login", (req, res) => {
  const { email, jelszo_hash } = req.body;
  if (!email || !jelszo_hash) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }
  const query = "SELECT * FROM felhasznalok WHERE email = ? LIMIT 1";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("❌ Adatbázis hiba a bejelentkezéskor:", err);
      return res.status(500).json({ error: "Adatbázis hiba" });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Hibás email vagy jelszó" });
    }
    const user = results[0];
    if (jelszo_hash !== user.jelszo_hash) {
      return res.status(401).json({ error: "Hibás email vagy jelszó" });
    }
    res.json({ success: true, user });
  });
});

// Regisztráció
app.post("/api/felhasznalok", (req, res) => {
  const { vezeteknev, keresztnev, felhasznalonev, email, jelszo_hash } = req.body;
  if (!vezeteknev || !keresztnev || !felhasznalonev || !email || !jelszo_hash) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }
  const sql =
    "INSERT INTO felhasznalok (vezeteknev, keresztnev, felhasznalonev, email, jelszo_hash) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [vezeteknev, keresztnev, felhasznalonev, email, jelszo_hash], (err, result) => {
    if (err) {
      console.error("❌ Regisztrációs hiba:", err);
      return res.status(500).json({ success: false, error: err });
    }
    res.json({ success: true, userId: result.insertId });
  });
});

// Statikus front-end fájlok kiszolgálása
app.use(express.static(path.join(__dirname, "../kicksify_frontend")));

// Minden egyéb GET kérésre az index.html visszaküldése
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../kicksify_frontend/index.html"));
});

// Szerver indítása
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
  





app.put("/felhasznalok/:id", (req, res) => {
  const userId = req.params.id;
  const { is_admin } = req.body;
  // Itt jön az adatbázis lekérdezés, például egy SQL UPDATE parancs
  // Példa (pszeudokód):
  db.query("UPDATE users SET is_admin = ? WHERE id = ?", [is_admin, userId], (err, result) => {
      if (err) return res.status(500).json({ error: "Hiba történt" });
      // Majd lekérjük az updated user adatait és elküldjük
      db.query("SELECT * FROM users WHERE id = ?", [userId], (err, rows) => {
          if (err) return res.status(500).json({ error: "Hiba történt" });
          res.json(rows[0]);
      });
  });
});
