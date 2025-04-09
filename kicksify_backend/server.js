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

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL Database");
});

// STATIKUS KÉPEK KISZOLGÁLÁSA
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

// GET cipők keresése (részleges egyezés a márka és modell mezőkben)
app.get("/api/cipok/search", (req, res) => {
  const queryParam = req.query.query;
  if (!queryParam) {
    return res.status(400).json({ error: "Hiányzó keresési kifejezés" });
  }
  const lowerQuery = queryParam.toLowerCase();
  let sql, values;
  if (lowerQuery === "nike") {
    sql = `
      SELECT c.*,
             GROUP_CONCAT(m.meret ORDER BY m.meret ASC SEPARATOR ',') AS meretek
      FROM cipok c
      LEFT JOIN meretek m ON c.cipo_id = m.cipo_id
      WHERE LOWER(c.marka) = ?
      GROUP BY c.cipo_id
    `;
    values = [lowerQuery];
  } else {
    sql = `
      SELECT c.*,
             GROUP_CONCAT(m.meret ORDER BY m.meret ASC SEPARATOR ',') AS meretek
      FROM cipok c
      LEFT JOIN meretek m ON c.cipo_id = m.cipo_id
      WHERE LOWER(c.marka) LIKE ? OR LOWER(c.modell) LIKE ?
      GROUP BY c.cipo_id
    `;
    const likeQuery = `%${lowerQuery}%`;
    values = [likeQuery, likeQuery];
  }
  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("❌ Keresési hiba:", err);
      return res.status(500).json({ error: "Adatbázis hiba" });
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

// GET ártörténet – a normál cipők esetében
app.get("/api/cipok/:id/arvaltozas", (req, res) => {
  const cipoId = req.params.id;
  const query = `
    SELECT arvaltozas_id, datum, ar
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

// GET méretek – normál cipők esetében
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

// GET összes exkluzív cipő
app.get("/api/exkluziv_cipok", (req, res) => {
  db.query("SELECT * FROM exkluziv_cipok", (err, results) => {
    if (err) {
      console.error("❌ Exkluzív cipők lekérdezési hiba:", err);
      return res.status(500).json({ error: "Hiba történt az exkluzív cipők lekérdezésekor" });
    }
    res.json(results);
  });
});

// GET egy exkluzív cipő
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

// POST új exkluzív cipő
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

// PUT exkluzív cipő módosítás
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

// DELETE exkluzív cipő
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

// GET exkluzív cipő méretek
app.get("/api/exkluziv_cipok/:id/meretek", (req, res) => {
  const exId = req.params.id;
  db.query("SELECT meret_id, keszlet FROM exkluziv_cipo_meretek WHERE exkluziv_id = ?", [exId], (err, results) => {
    if (err) {
      console.error("❌ Exkluzív cipő méretek lekérdezési hiba:", err);
      return res.status(500).json({ error: "Hiba az exkluzív méretek lekérdezésekor" });
    }
    res.json(results);
  });
});

// POST új exkluzív cipő méret
app.post("/api/exkluziv_cipok/:id/meretek", (req, res) => {
  const exId = req.params.id;
  const { meret, keszlet } = req.body;
  if (!meret || (keszlet === undefined || keszlet === null)) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }
  const sql = "INSERT INTO exkluziv_cipo_meretek (exkluziv_id, meret_id, keszlet) VALUES (?, ?, ?)";
  // Feltételezzük, hogy a formban megadott "meret" egy numerikus érték, melyet itt a meret_id-ként tárolunk
  db.query(sql, [exId, meret, keszlet], (err, result) => {
    if (err) {
      console.error("❌ Exkluzív méret létrehozási hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true });
  });
});

// PUT exkluzív cipő méret módosítás
app.put("/api/exkluziv_cipok/meretek/:meret_id", (req, res) => {
  const meretId = req.params.meret_id;
  const { exkluziv_id, meret, keszlet } = req.body;
  const sql = "UPDATE exkluziv_cipo_meretek SET meret_id = ?, keszlet = ? WHERE exkluziv_id = ? AND meret_id = ?";
  db.query(sql, [meret, keszlet, exkluziv_id, meretId], (err) => {
    if (err) {
      console.error("❌ Exkluzív méret update hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true });
  });
});

// DELETE exkluzív cipő méret (a exkluzív cipő azonosítója a query paraméterben kell, hogy legyen)
app.delete("/api/exkluziv_cipok/meretek/:meret_id", (req, res) => {
  const meretId = req.params.meret_id;
  const exkluziv_id = req.query.exkluziv_id;
  if (!exkluziv_id) {
    return res.status(400).json({ error: "Hiányzó exkluzív cipő azonosító" });
  }
  const sql = "DELETE FROM exkluziv_cipo_meretek WHERE exkluziv_id = ? AND meret_id = ?";
  db.query(sql, [exkluziv_id, meretId], (err) => {
    if (err) {
      console.error("❌ Exkluzív méret törlés hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true });
  });
});

/* =========================
   ÁRTÖRTÉNET
========================= */

// GET ártörténet normál cipőkhöz már fent van: /api/cipok/:id/arvaltozas

// GET ártörténet exkluzív cipőkhöz
app.get("/api/exkluziv_cipok/:id/arvaltozas", (req, res) => {
  const exId = req.params.id;
  const query = `
    SELECT arvaltozas_id, datum, ar
    FROM arvaltozas
    WHERE exkluziv_id = ?
    ORDER BY datum ASC
  `;
  db.query(query, [exId], (err, results) => {
    if (err) {
      console.error("❌ Exkluzív ártörténet lekérdezési hiba:", err);
      return res.status(500).json({ error: "Hiba az exkluzív ártörténet lekérdezésekor" });
    }
    res.json(results);
  });
});

// POST új ártörténeti bejegyzés (normál és exkluzív cipők esetén)
app.post("/api/arvaltozas", (req, res) => {
  const { cipo_id, exkluziv_id, datum, ar } = req.body;
  const sql = "INSERT INTO arvaltozas (cipo_id, exkluziv_id, datum, ar) VALUES (?, ?, ?, ?)";
  // Ha normál cipőről van szó, exkluziv_id legyen null, ha exkluzív - akkor cipo_id legyen null.
  db.query(sql, [cipo_id || null, exkluziv_id || null, datum, ar], (err, result) => {
    if(err) {
      console.error("❌ Ártörténet létrehozási hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true, newId: result.insertId, exkluziv_id: exkluziv_id || null });
  });
});

// PUT ártörténet módosítás
app.put("/api/arvaltozas/:id", (req, res) => {
  const arId = req.params.id;
  const { datum, ar } = req.body;
  const sql = "UPDATE arvaltozas SET datum = ?, ar = ? WHERE arvaltozas_id = ?";
  db.query(sql, [datum, ar, arId], (err) => {
    if(err) {
      console.error("❌ Ártörténet update hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true });
  });
});

// DELETE ártörténet
app.delete("/api/arvaltozas/:id", (req, res) => {
  const arId = req.params.id;
  const sql = "DELETE FROM arvaltozas WHERE arvaltozas_id = ?";
  db.query(sql, [arId], (err) => {
    if(err) {
      console.error("❌ Ártörténet törlés hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true });
  });
});

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
