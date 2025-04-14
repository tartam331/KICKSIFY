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

// STATIKUS KÉPEK KISZOLGÁLÁSA (csak képek, nem az egész frontend!)
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

// Regisztráció
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


/* =====================================================================
      ADMIN FÜLÜLET – NORMÁL CIPŐK ÉS TÁMOGATÓ VÉGPONTOK (ADMIN ENDPOINTOK)
===================================================================== */

/* Normál cipők kezelése */

// GET márkák listája
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

// GET: Cipők keresése (mindig LIKE-al)
app.get("/api/cipok/search", (req, res) => {
  const queryParam = req.query.query;
  if (!queryParam) {
    return res.status(400).json({ error: "Hiányzó keresési kifejezés" });
  }
  const lowerQuery = queryParam.toLowerCase();
  const likeQuery = `%${lowerQuery}%`;
  const sql = `
    SELECT c.*,
           GROUP_CONCAT(m.meret ORDER BY m.meret ASC SEPARATOR ',') AS meretek
    FROM cipok c
    LEFT JOIN meretek m ON c.cipo_id = m.cipo_id
    WHERE LOWER(c.marka) LIKE ? OR LOWER(c.modell) LIKE ? OR LOWER(c.leiras) LIKE ?
    GROUP BY c.cipo_id
  `;
  const values = [likeQuery, likeQuery, likeQuery];
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

// POST: Új normál cipő
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

// PUT: Normál cipő módosítása
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

// DELETE: Normál cipő törlése
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

// MÉRETEK – Normál cipőkhöz
app.get("/api/cipok/:id/meretek", (req, res) => {
  const cipoId = req.params.id;
  db.query("SELECT * FROM meretek WHERE cipo_id = ? ORDER BY meret ASC", [cipoId], (err, results) => {
    if (err) {
      console.error("❌ Normál cipők méretei lekérdezési hiba:", err);
      return res.status(500).json({ error: "Adatbázis hiba" });
    }
    res.json(results);
  });
});

app.post("/api/meretek", (req, res) => {
  const { cipo_id, meret } = req.body;
  if (!cipo_id || !meret) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }
  const sql = "INSERT INTO meretek (cipo_id, meret) VALUES (?, ?)";
  db.query(sql, [cipo_id, meret], (err, result) => {
    if (err) {
      console.error("❌ Normál méret létrehozási hiba:", err);
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
      console.error("❌ Normál méret update hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true });
  });
});

app.delete("/api/meretek/:id", (req, res) => {
  const meretId = req.params.id;
  db.query("DELETE FROM meretek WHERE meret_id = ?", [meretId], (err) => {
    if (err) {
      console.error("❌ Normál méret törlés hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true });
  });
});

// ÁRTÖRTÉNET – Normál cipőkhöz
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
      console.error("❌ Normál cipő ártörténet lekérdezési hiba:", err);
      return res.status(500).json({ error: "Hiba az ár történet lekérdezésekor" });
    }
    res.json(results);
  });
});

app.post("/api/arvaltozas", (req, res) => {
  const { cipo_id, datum, ar } = req.body;
  if (!cipo_id || !datum || !ar) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }
  const sql = "INSERT INTO arvaltozas (cipo_id, datum, ar) VALUES (?, ?, ?)";
  db.query(sql, [cipo_id, datum, ar], (err, result) => {
    if (err) {
      console.error("❌ Normál cipő ártörténet létrehozási hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true, insertId: result.insertId });
  });
});

app.put("/api/arvaltozas/:id", (req, res) => {
  const arValtozasId = req.params.id;
  const { datum, ar } = req.body;
  if (!datum || !ar) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }
  const sql = "UPDATE arvaltozas SET datum = ?, ar = ? WHERE arvaltozas_id = ?";
  db.query(sql, [datum, ar, arValtozasId], (err) => {
    if (err) {
      console.error("❌ Normál cipő ártörténet update hiba:", err);
      return res.status(500).json({ error: "Hiba az ár frissítésekor" });
    }
    res.json({ success: true });
  });
});

app.delete("/api/arvaltozas/:id", (req, res) => {
  const arValtozasId = req.params.id;
  const sql = "DELETE FROM arvaltozas WHERE arvaltozas_id = ?";
  db.query(sql, [arValtozasId], (err) => {
    if (err) {
      console.error("❌ Normál cipő ártörténet törlés hiba:", err);
      return res.status(500).json({ error: "Hiba az ár bejegyzés törlésekor" });
    }
    res.json({ success: true });
  });
});


/* =====================================================================
      ADMIN FÜLÜLET – EXKLUZÍV CIPŐK ÉS TÁMOGATÓ VÉGPONTOK (ADMIN ENDPOINTOK)
===================================================================== */

// EXKLUZÍV CIPŐK kezelése
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
  const { szin, cikkszam, marka, modell, ar, leiras, kep } = req.body;
  const kepValue = (kep && kep.trim() !== "") ? kep.trim() : "default.jpg";
  const sql = `
    INSERT INTO exkluziv_cipok (szin, cikkszam, marka, modell, ar, leiras, kep, fizetes_szallitas)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'Alap szöveg')
  `;
  db.query(sql, [szin, cikkszam, marka, modell, ar, leiras, kepValue], (err, result) => {
    if (err) {
      console.error("❌ Exkluzív cipő létrehozási hiba:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json({ success: true, newId: result.insertId });
  });
});

app.put("/api/exkluziv_cipok/:id", (req, res) => {
  const id = req.params.id;
  const { szin, cikkszam, marka, modell, ar, leiras, kep } = req.body;
  const kepValue = (kep && kep.trim() !== "") ? kep.trim() : "default.jpg";
  const sql = "UPDATE exkluziv_cipok SET szin = ?, cikkszam = ?, marka = ?, modell = ?, ar = ?, leiras = ?, kep = ? WHERE exkluziv_id = ?";
  db.query(sql, [szin, cikkszam, marka, modell, ar, leiras, kepValue, id], (err) => {
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

// EXKLUZÍV CIPŐK MÉRETEI
app.get("/api/exkluziv_cipok/:exId/meretek", (req, res) => {
  const exId = req.params.exId;
  // A táblában nincs "ex_meret" oszlop, ezért a "meret_id"-t használjuk alias "meret"-ként.
  const query = "SELECT meret_id, meret_id AS meret, keszlet FROM exkluziv_cipo_meretek WHERE exkluziv_id = ?";
  db.query(query, [exId], (err, results) => {
    if (err) {
      console.error("❌ Exkluzív méretek lekérdezési hiba:", err);
      return res.status(500).json({ error: "Hiba az exkluzív méretek lekérdezésekor" });
    }
    res.json(results);
  });
});

// POST: Új exkluzív cipő méret hozzáadása
app.post("/api/exkluziv_cipok/:exId/meretek", (req, res) => {
  const exId = req.params.exId;
  const { meret, keszlet } = req.body;
  if (!meret || (keszlet === undefined)) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }
  // Javítottam: az "ex_meret" helyett a "meret_id" oszlopot használjuk
  const query = "INSERT INTO exkluziv_cipo_meretek (exkluziv_id, meret_id, keszlet) VALUES (?, ?, ?)";
  db.query(query, [exId, meret, keszlet], (err, result) => {
    if (err) {
      console.error("❌ Exkluzív méret hozzáadás hiba:", err);
      return res.status(500).json({ error: "Hiba az exkluzív méret hozzáadásakor" });
    }
    res.json({ success: true, insertId: result.insertId });
  });
});

app.put("/api/exkluziv_cipok/meretek/:meretId", (req, res) => {
  const meretId = req.params.meretId;
  const { meret, keszlet } = req.body;
  if (!meret || (keszlet === undefined)) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }
  const query = "UPDATE exkluziv_cipo_meretek SET ex_meret = ?, keszlet = ? WHERE meret_id = ?";
  // Ha szükséges, itt is javítható: ha a táblában csak a "meret_id" található, akkor az update változtatására
  // hasonló megoldás alkalmazandó, de általában a POST végpontot kell javítani.
  db.query("UPDATE exkluziv_cipo_meretek SET meret_id = ?, keszlet = ? WHERE meret_id = ?", [meret, keszlet, meretId], (err) => {
    if (err) {
      console.error("❌ Exkluzív méret update hiba:", err);
      return res.status(500).json({ error: "Hiba az exkluzív méret frissítésekor" });
    }
    res.json({ success: true });
  });
});

app.delete("/api/exkluziv_cipok/meretek/:meretId", (req, res) => {
  const meretId = req.params.meretId;
  const query = "DELETE FROM exkluziv_cipo_meretek WHERE meret_id = ?";
  db.query(query, [meretId], (err, result) => {
    if (err) {
      console.error("❌ Exkluzív méret törlés hiba:", err);
      return res.status(500).json({ error: "Hiba az exkluzív méret törlésekor" });
    }
    res.json({ success: true });
  });
});

// EXKLUZÍV CIPŐK ÁRTÖRTÉNETÉNEK KEZELÉSE
app.get("/api/exkluziv_cipok/:exId/arvaltozas", (req, res) => {
  const exId = req.params.exId;
  const query = `
    SELECT datum, ar, arvaltozas_id
    FROM arvaltozas
    WHERE exkluziv_id = ?
    ORDER BY datum ASC
  `;
  db.query(query, [exId], (err, results) => {
    if (err) {
      console.error("❌ Exkluzív ártörténet lekérdezési hiba:", err);
      return res.status(500).json({ error: "Hiba az exkluzív ár történet lekérdezésekor" });
    }
    res.json(results);
  });
});

app.post("/api/exkluziv_cipok/:exId/arvaltozas", (req, res) => {
  const exId = req.params.exId;
  const { datum, ar } = req.body;
  if (!datum || !ar) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }
  const query = "INSERT INTO arvaltozas (exkluziv_id, datum, ar) VALUES (?, ?, ?)";
  db.query(query, [exId, datum, ar], (err, result) => {
    if (err) {
      console.error("❌ Exkluzív ártörténet hozzáadás hiba:", err);
      return res.status(500).json({ error: "Hiba az új ár hozzáadásakor" });
    }
    res.json({ success: true, insertId: result.insertId });
  });
});


/* =========================
   ÁRTÖRTÉNET általános végpontok (GET, PUT, DELETE)
========================= */
app.get("/api/arvaltozas/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM arvaltozas WHERE arvaltozas_id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("❌ Ártörténet GET hiba:", err);
      return res.status(500).json({ error: "Ártörténet lekérdezési hiba" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Nincs ilyen ártörténeti bejegyzés" });
    }
    res.json(results[0]);
  });
});

app.put("/api/arvaltozas/:id", (req, res) => {
  const arValtozasId = req.params.id;
  const { datum, ar } = req.body;
  if (!datum || !ar) {
    return res.status(400).json({ error: "Hiányzó adatok" });
  }
  const sql = "UPDATE arvaltozas SET datum = ?, ar = ? WHERE arvaltozas_id = ?";
  db.query(sql, [datum, ar, arValtozasId], (err) => {
    if (err) {
      console.error("❌ Ártörténet update hiba:", err);
      return res.status(500).json({ error: "Hiba az ár frissítésekor" });
    }
    res.json({ success: true });
  });
});

app.delete("/api/arvaltozas/:id", (req, res) => {
  const arValtozasId = req.params.id;
  const sql = "DELETE FROM arvaltozas WHERE arvaltozas_id = ?";
  db.query(sql, [arValtozasId], (err) => {
    if (err) {
      console.error("❌ Ártörténet törlés hiba:", err);
      return res.status(500).json({ error: "Hiba az ár bejegyzés törlésekor" });
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
