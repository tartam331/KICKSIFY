// server.js

const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

// Alap middlewares
app.use(cors());
app.use(express.json());

// Adatbázis kapcsolat beállítása
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "kicksify",
  port: process.env.DB_PORT || 3306
});

// Adatbázis kapcsolódás kezelése
db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL Database");
});

// =============== STATIKUS KÉPEK KISZOLGÁLÁSA ===============
app.use("/images", express.static(path.join(__dirname, "images")));

// =============== CIPŐK ENDPOINTOK ===============

// Összes cipő (normál) lekérése méretekkel együtt
app.get("/api/cipok", (req, res) => {
  let query = `
    SELECT c.*,
           GROUP_CONCAT(m.meret ORDER BY m.meret ASC) AS meretek
    FROM cipok c
    LEFT JOIN meretek m ON c.cipo_id = m.cipo_id
  `;

  // Opcionális szűrés márka alapján (pl. ?marka=Nike)
  if (req.query.marka) {
    query += " WHERE c.marka = " + mysql.escape(req.query.marka);
  }
  query += " GROUP BY c.cipo_id";

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ /api/cipok hiba:", err);
      return res.status(500).json({ error: "Hiba az adatbázis lekérdezésekor" });
    }
    res.json(results);
  });
});

// Egy adott cipő (normál) lekérése méretekkel együtt
app.get("/api/cipok/:id", (req, res) => {
  const cipoId = req.params.id;
  const query = `
    SELECT c.*,
           GROUP_CONCAT(m.meret ORDER BY m.meret ASC) AS meretek
    FROM cipok c
    LEFT JOIN meretek m ON c.cipo_id = m.cipo_id
    WHERE c.cipo_id = ?
    GROUP BY c.cipo_id
  `;
  db.query(query, [cipoId], (err, results) => {
    if (err) {
      console.error("❌ /api/cipok/:id hiba:", err);
      return res.status(500).json({ error: "Adatbázis hiba" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Nincs ilyen termék" });
    }
    res.json(results[0]);
  });
});

// Egy adott cipő ár-változásainak lekérése
app.get("/api/cipok/:id/arvaltozas", (req, res) => {
  const cipoId = req.params.id;
  const query = `
    SELECT datum, ar
    FROM arvaltozas
    WHERE cipo_id = ?
    ORDER BY datum ASC
  `;
  db.query(query, [cipoId], (err, results) => {
    if (err) {
      console.error("❌ /api/cipok/:id/arvaltozas hiba:", err);
      return res.status(500).json({ error: "Hiba az ár történet lekérdezésekor" });
    }
    res.json(results);
  });
});

// Egy adott cipő méreteinek lekérése (ha külön szükséges)
app.get("/api/cipok/:id/meretek", (req, res) => {
  const cipoId = req.params.id;
  const query = "SELECT meret FROM meretek WHERE cipo_id = ?";
  db.query(query, [cipoId], (err, results) => {
    if (err) {
      console.error("❌ /api/cipok/:id/meretek hiba:", err);
      return res.status(500).json({ error: "Adatbázis hiba" });
    }
    res.json(results);
  });
});

// =============== EXKLUZÍV CIPŐK ENDPOINTOK ===============

// Összes exkluzív cipő lekérése
app.get("/api/exkluziv_cipok", (req, res) => {
  const query = "SELECT * FROM exkluziv_cipok";
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Exkluzív cipők lekérdezési hiba:", err);
      return res.status(500).json({ error: "Hiba történt az exkluzív cipők lekérdezésekor" });
    }
    res.json(results);
  });
});

// Egy adott exkluzív cipő lekérése méretekkel együtt
app.get("/api/exkluziv_cipok/:id", (req, res) => {
  const exId = req.params.id;
  const query = `
    SELECT ec.*,
           GROUP_CONCAT(em.meret ORDER BY em.meret ASC) AS meretek
    FROM exkluziv_cipok ec
    LEFT JOIN exkluziv_cipo_meretek em ON ec.exkluziv_id = em.exkluziv_id
    WHERE ec.exkluziv_id = ?
    GROUP BY ec.exkluziv_id
  `;
  db.query(query, [exId], (err, results) => {
    if (err) {
      console.error("❌ /api/exkluziv_cipok/:id hiba:", err);
      return res.status(500).json({ error: "Adatbázis hiba" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Nincs ilyen exkluzív termék" });
    }
    res.json(results[0]);
  });
});

// Egy adott exkluzív cipő méreteinek lekérése
app.get("/api/exkluziv_cipok/:id/meretek", (req, res) => {
  const exId = req.params.id;
  const query = "SELECT meret FROM exkluziv_cipo_meretek WHERE exkluziv_id = ?";
  db.query(query, [exId], (err, results) => {
    if (err) {
      console.error("❌ /api/exkluziv_cipok/:id/meretek hiba:", err);
      return res.status(500).json({ error: "Adatbázis hiba" });
    }
    res.json(results);
  });
});

// (Opcionális) Ha lenne exkluzív ár-változás tábla, ide jöhetne hasonlóan

// =============== KOSÁR ENDPOINTOK ===============

// Kosárba adás
app.post("/api/kosar", (req, res) => {
  const { felhasznalo_id, cipo_id, meret, darabszam, egysegar } = req.body;
  if (!felhasznalo_id || !cipo_id || !meret || !darabszam || !egysegar) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }
  const query = `
    INSERT INTO kosar (felhasznalo_id, cipo_id, meret, darabszam, egysegar)
    VALUES (?, ?, ?, ?, ?)
  `;
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
      console.error("❌ /api/kosar/:felhasznalo_id hiba:", err);
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

// =============== FELHASZNÁLÓK / AUTH ENDPOINTOK ===============

// Bejelentkezés
app.post("/api/felhasznalok/login", (req, res) => {
  const { email, jelszo_hash } = req.body;
  if (!email || !jelszo_hash) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }
  const query = "SELECT * FROM felhasznalok WHERE email = ? LIMIT 1";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("❌ /api/felhasznalok/login hiba:", err);
      return res.status(500).json({ error: "Adatbázis hiba" });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Hibás email vagy jelszó" });
    }
    const user = results[0];
    if (jelszo_hash !== user.jelszo_hash) {
      return res.status(401).json({ error: "Hibás email vagy jelszó" });
    }
    // Sikeres bejelentkezés
    res.json({ success: true, user });
  });
});

// Regisztráció
app.post("/api/felhasznalok", (req, res) => {
  const { vezeteknev, keresztnev, felhasznalonev, email, jelszo_hash } = req.body;
  if (!vezeteknev || !keresztnev || !felhasznalonev || !email || !jelszo_hash) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }
  const sql = `
    INSERT INTO felhasznalok (vezeteknev, keresztnev, felhasznalonev, email, jelszo_hash)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [vezeteknev, keresztnev, felhasznalonev, email, jelszo_hash], (err, result) => {
    if (err) {
      console.error("❌ Regisztrációs hiba:", err);
      return res.status(500).json({ success: false, error: err });
    }
    res.json({ success: true, userId: result.insertId });
  });
});

// (DEMO) Felhasználó PUT példa - ha szükséges
app.put("/felhasznalok/:id", (req, res) => {
  const userId = req.params.id;
  const { is_admin } = req.body;
  // FIGYELEM: Ez a példa 'users' táblára hivatkozik. Igazítsd a valós tábla nevéhez,
  // ha 'felhasznalok' a tábla, cseréld ki a lekérdezést is.
  db.query("UPDATE users SET is_admin = ? WHERE id = ?", [is_admin, userId], (err) => {
    if (err) return res.status(500).json({ error: "Hiba történt a frissítés során" });

    db.query("SELECT * FROM users WHERE id = ?", [userId], (err2, rows) => {
      if (err2) return res.status(500).json({ error: "Hiba a felhasználó lekérdezésekor" });
      res.json(rows[0]);
    });
  });
});

// =============== STATIKUS FRONTEND KISZOLGÁLÁS ===============
app.use(express.static(path.join(__dirname, "../kicksify_frontend")));

// Bármilyen GET kérésre küldje vissza az index.html-t (SPA routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../kicksify_frontend/index.html"));
});

// =============== INDÍTÁS ===============
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
