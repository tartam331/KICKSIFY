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
  port: process.env.DB_PORT || 3307
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL Database");
});

// STATIKUS KÉPEK KISZOLGÁLÁSA
// A kicksify_frontend/cipok mappa tartalmazza a cipők képeit, elérhetőek a "/cipok" útvonalon.
app.use("/cipok", express.static(path.join(__dirname, "../kicksify_frontend/cipok")));
app.use("/images", express.static(path.join(__dirname, "images")));

/* =========================
   API VÉGPONTOK
=========================*/

/* FELHASZNÁLÓK / AUTH */

// Login
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
    res.json({ success: true, user });
  });
});

// Regisztráció (felhasználó létrehozása) – itt bekerül a felhasznalonev is
app.post("/api/felhasznalok", (req, res) => {
  const { vezeteknev, keresztnev, felhasznalonev, email, jelszo_hash, szerep } = req.body;
  if (!vezeteknev || !keresztnev || !felhasznalonev || !email || !jelszo_hash) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }
  const sql = `
    INSERT INTO felhasznalok (vezeteknev, keresztnev, felhasznalonev, email, jelszo_hash, szerep)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [vezeteknev, keresztnev, felhasznalonev, email, jelszo_hash, (szerep || "Vásárló")], (err, result) => {
    if (err) {
      console.error("❌ Regisztrációs hiba:", err);
      return res.status(500).json({ success: false, error: err });
    }
    res.json({ success: true, userId: result.insertId });
  });
});

// GET összes felhasználó
app.get("/api/felhasznalok", (req, res) => {
  db.query("SELECT * FROM felhasznalok", (err, results) => {
    if (err) {
      console.error("❌ Felhasználók listázási hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json(results);
  });
});

// GET egy felhasználó
app.get("/api/felhasznalok/:id", (req, res) => {
  const userId = req.params.id;
  db.query("SELECT * FROM felhasznalok WHERE felhasznalo_id = ?", [userId], (err, rows) => {
    if (err) {
      console.error("❌ Felhasználó GET hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    if (rows.length === 0) return res.status(404).json({ error: "Nincs ilyen felhasználó" });
    res.json(rows[0]);
  });
});

// UPDATE felhasználó
app.put("/api/felhasznalok/:id", (req, res) => {
  const userId = req.params.id;
  const { vezeteknev, keresztnev, felhasznalonev, email, szerep } = req.body;
  const sql = `
    UPDATE felhasznalok
    SET vezeteknev = ?, keresztnev = ?, felhasznalonev = ?, email = ?, szerep = ?
    WHERE felhasznalo_id = ?
  `;
  db.query(sql, [vezeteknev, keresztnev, felhasznalonev, email, szerep, userId], (err) => {
    if (err) {
      console.error("❌ Felhasználó update hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true });
  });
});

// DELETE felhasználó
app.delete("/api/felhasznalok/:id", (req, res) => {
  const userId = req.params.id;
  db.query("DELETE FROM felhasznalok WHERE felhasznalo_id = ?", [userId], (err) => {
    if (err) {
      console.error("❌ Felhasználó törlés hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true });
  });
});

/* =========================
   KOSÁR
========================= */
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

app.delete("/api/kosar/:id", (req, res) => {
  const kosarId = req.params.id;
  const query = "DELETE FROM kosar WHERE kosar_id = ?";
  db.query(query, [kosarId], (err) => {
    if (err) {
      console.error("❌ Kosár törlési hiba:", err);
      return res.status(500).json({ error: "Nem sikerült törölni a kosárból" });
    }
    res.json({ success: true, message: "Termék eltávolítva a kosárból" });
  });
});

/* =========================
   NORMÁL CIPŐK
========================= */

// GET márkák listája – ez a végpont a /api/cipok/:id előtt legyen!
app.get("/api/cipok/brands", (req, res) => {
  const sql = "SELECT DISTINCT marka FROM cipok";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Cipő márkák lekérdezési hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    const brands = results.map(row => row.marka);
    res.json(brands);
  });
});

// GET összes cipő, opcionálisan márka szerint szűrve
app.get("/api/cipok", (req, res) => {
  let query = `
    SELECT c.*,
           GROUP_CONCAT(m.meret ORDER BY m.meret ASC SEPARATOR ',') AS meretek
    FROM cipok c
    LEFT JOIN meretek m ON c.cipo_id = m.cipo_id
  `;
  if (req.query.marka) {
    query += " WHERE c.marka = " + mysql.escape(req.query.marka);
  }
  query += " GROUP BY c.cipo_id";
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Cipők lekérdezési hiba:", err);
      return res.status(500).json({ error: "Hiba az adatbázis lekérdezésekor" });
    }
    res.json(results);
  });
});

// GET egy cipő
app.get("/api/cipok/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM cipok WHERE cipo_id = ?", [id], (err, rows) => {
    if (err) {
      console.error("❌ Cipő GET hiba:", err);
      return res.status(500).json({ error: "Adatbázis hiba" });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: "Nincs ilyen cipő" });
    }
    res.json(rows[0]);
  });
});

// GET ártörténet – a termékoldalon a charthoz
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
      console.error("❌ Ártörténet lekérdezési hiba:", err);
      return res.status(500).json({ error: "Hiba az ár történet lekérdezésekor" });
    }
    res.json(results);
  });
});

// GET méretek – a normál cipők esetében a "meretek" tábla csak a "meret" mezőt tartalmazza
app.get("/api/cipok/:id/meretek", (req, res) => {
  const cipoId = req.params.id;
  db.query("SELECT meret FROM meretek WHERE cipo_id = ?", [cipoId], (err, results) => {
    if (err) {
      console.error("❌ Méretek lekérdezési hiba:", err);
      return res.status(500).json({ error: "Adatbázis hiba" });
    }
    res.json(results);
  });
});

// POST új cipő
app.post("/api/cipok", (req, res) => {
  const { marka, modell, ar, leiras, kep } = req.body;
  const kepValue = (kep && kep.trim() !== "") ? kep.trim() : "default.jpg";
  const sql = `
    INSERT INTO cipok (marka, modell, ar, leiras, szin, cikkszam, kep, fizetes_szallitas)
    VALUES (?, ?, ?, ?, 'Fekete','ABC123', ?, 'Alap szöveg')
  `;
  db.query(sql, [marka, modell, ar, leiras, kepValue], (err, result) => {
    if (err) {
      console.error("❌ Cipő létrehozási hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true, newId: result.insertId });
  });
});

// PUT cipő módosítás
app.put("/api/cipok/:id", (req, res) => {
  const id = req.params.id;
  const { marka, modell, ar, leiras, kep } = req.body;
  const kepValue = (kep && kep.trim() !== "") ? kep.trim() : "default.jpg";
  const sql = "UPDATE cipok SET marka = ?, modell = ?, ar = ?, leiras = ?, kep = ? WHERE cipo_id = ?";
  db.query(sql, [marka, modell, ar, leiras, kepValue, id], (err) => {
    if (err) {
      console.error("❌ Cipő update hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true });
  });
});

// DELETE cipő
app.delete("/api/cipok/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM cipok WHERE cipo_id = ?", [id], (err) => {
    if (err) {
      console.error("❌ Cipő törlés hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true });
  });
});

/* =========================
   EXKLUZÍV CIPŐK
========================= */
app.get("/api/exkluziv_cipok", (req, res) => {
  db.query("SELECT * FROM exkluziv_cipok", (err, results) => {
    if (err) {
      console.error("❌ Exkluzív cipők lekérdezési hiba:", err);
      return res.status(500).json({ error: "Hiba történt az exkluzív cipők lekérdezésekor" });
    }
    res.json(results);
  });
});

app.get("/api/exkluziv_cipok/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM exkluziv_cipok WHERE exkluziv_id = ?", [id], (err, rows) => {
    if (err) {
      console.error("❌ Exkluzív cipő GET hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    if (rows.length === 0) return res.status(404).json({ error: "Nincs ilyen exkluzív cipő" });
    res.json(rows[0]);
  });
});

app.post("/api/exkluziv_cipok", (req, res) => {
  const { marka, modell, ar, leiras } = req.body;
  const sql = "INSERT INTO exkluziv_cipok (marka, modell, ar, leiras, szin, cikkszam, kep, fizetes_szallitas) VALUES (?,?,?,?,'Fekete','EX123','default.jpg','Alap szöveg')";
  db.query(sql, [marka, modell, ar, leiras], (err, result) => {
    if (err) {
      console.error("❌ Exkluzív cipő létrehozási hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true, newId: result.insertId });
  });
});

app.put("/api/exkluziv_cipok/:id", (req, res) => {
  const id = req.params.id;
  const { marka, modell, ar, leiras } = req.body;
  const sql = "UPDATE exkluziv_cipok SET marka = ?, modell = ?, ar = ?, leiras = ? WHERE exkluziv_id = ?";
  db.query(sql, [marka, modell, ar, leiras, id], (err) => {
    if (err) {
      console.error("❌ Exkluzív cipő update hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true });
  });
});

app.delete("/api/exkluziv_cipok/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM exkluziv_cipok WHERE exkluziv_id = ?", [id], (err) => {
    if (err) {
      console.error("❌ Exkluzív cipő törlés hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true });
  });
});

/* =========================
   MÉRETEK (Normál cipőkhez)
========================= */
app.get("/api/meretek", (req, res) => {
  db.query("SELECT * FROM meretek", (err, results) => {
    if (err) {
      console.error("❌ Méretek lekérdezési hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json(results);
  });
});

app.get("/api/meretek/:id", (req, res) => {
  const meretId = req.params.id;
  db.query("SELECT * FROM meretek WHERE meret_id = ?", [meretId], (err, rows) => {
    if (err) {
      console.error("❌ Méret GET hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    if (rows.length === 0) return res.status(404).json({ error: "Nincs ilyen méret" });
    res.json(rows[0]);
  });
});

app.post("/api/meretek", (req, res) => {
  const { cipo_id, meret } = req.body;
  if (!cipo_id || !meret) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }
  const sql = "INSERT INTO meretek (cipo_id, meret) VALUES (?,?)";
  db.query(sql, [cipo_id, meret], (err, result) => {
    if (err) {
      console.error("❌ Méret létrehozási hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true, newId: result.insertId });
  });
});

app.put("/api/meretek/:id", (req, res) => {
  const meretId = req.params.id;
  const { cipo_id, meret } = req.body;
  const sql = "UPDATE meretek SET cipo_id = ?, meret = ? WHERE meret_id = ?";
  db.query(sql, [cipo_id, meret, meretId], (err) => {
    if (err) {
      console.error("❌ Méret update hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true });
  });
});

app.delete("/api/meretek/:id", (req, res) => {
  const meretId = req.params.id;
  db.query("DELETE FROM meretek WHERE meret_id = ?", [meretId], (err) => {
    if (err) {
      console.error("❌ Méret törlés hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true });
  });
});

/* =========================
   ÁRTÖRTÉNET
========================= */
// Ez a végpont már fent definiált: /api/cipok/:id/arvaltozas

/* =========================
   STATIKUS FRONTEND KISZOLGÁLÁS
========================= */
app.use(express.static(path.join(__dirname, "../kicksify_frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../kicksify_frontend/index.html"));
});

// INDÍTÁS
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
