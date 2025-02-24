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

    // Képek URL-jének hozzáadása és méretek feldolgozása
    const updatedResults = results.map(cipo => ({
      ...cipo,
      image: `http://localhost:${PORT}/images/${cipo.kep}`,
      meretek: cipo.meretek ? cipo.meretek.split(',').map(Number) : []
    }));

    res.json(updatedResults);
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

    const cipo = {
      ...results[0],
      image: `http://localhost:${PORT}/images/${results[0].kep}`,
      meretek: results[0].meretek ? results[0].meretek.split(',').map(Number) : []
    };

    res.json(cipo);
  });
});

// Kosárba adás
app.post("/api/kosar", (req, res) => {
  const { felhasznalo_id, cipo_id, meret, darabszam, egysegar } = req.body;
  if (!felhasznalo_id || !cipo_id || !meret || !darabszam || !egysegar) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }
  const query = "INSERT INTO kosar (felhasznalo_id, cipo_id, meret, darabszam, egysegar) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [felhasznalo_id, cipo_id, meret, darabszam, egysegar], (err, result) => {
    if (err) {
      console.error("❌ Kosár hiba:", err);
      return res.status(500).json({ error: "Hiba a kosárba adáskor" });
    }
    res.json({ success: true, message: "Termék hozzáadva a kosárhoz" });
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
  const sql = "INSERT INTO felhasznalok (vezeteknev, keresztnev, felhasznalonev, email, jelszo_hash) VALUES (?, ?, ?, ?, ?)";
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
