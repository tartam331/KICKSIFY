const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 📌 Adatbázis kapcsolat beállítása
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "", // Ha van jelszavad, add hozzá
    database: process.env.DB_NAME || "kicksify",
    port: process.env.DB_PORT || 3307
});

// 📌 Adatbázis kapcsolódás kezelése
db.connect(err => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
        process.exit(1); // Szerver leállítása, ha az adatbázis nem elérhető
    }
    console.log("✅ Connected to MySQL Database");
});

// 📂 Cipők képeinek kiszolgálása
app.use("/images", express.static(path.join(__dirname, "images")));

// 📌 API: Összes cipő lekérése az adatbázisból
app.get("/api/cipok", (req, res) => {
    let query = "SELECT * FROM cipok";
    if (req.query.marka) {
        query += " WHERE marka = " + mysql.escape(req.query.marka);
    }

    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ API hiba:", err);
            return res.status(500).json({ error: "Hiba az adatbázis lekérdezésekor" });
        }

        // Képek URL-jének hozzáadása
        const updatedResults = results.map(cipo => ({
            ...cipo,
            image: `http://localhost:${PORT}/images/${cipo.kep}`
        }));

        res.json(updatedResults);
    });
});

// 📌 API: Egy adott cipő lekérése
app.get("/api/cipok/:id", (req, res) => {
    const cipoId = req.params.id;
    const query = "SELECT * FROM cipok WHERE cipo_id = ?";

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
            image: `http://localhost:${PORT}/images/${results[0].kep}`
        };

        res.json(cipo);
    });
});

// 📌 API: Elérhető méretek és készlet lekérése egy cipőhöz
app.get("/api/cipok/:id/meretek", (req, res) => {
    const cipoId = req.params.id;

    // Ellenőrzés: férfi vagy női cipő?
    const checkGenderQuery = `
        SELECT COUNT(*) AS ferfi FROM ferfi_meretek WHERE cipo_id = ?
        UNION ALL
        SELECT COUNT(*) AS noi FROM noi_meretek WHERE cipo_id = ?
    `;

    db.query(checkGenderQuery, [cipoId, cipoId], (err, results) => {
        if (err) {
            console.error("❌ Méretlekérdezési hiba:", err);
            return res.status(500).json({ error: "Hiba az adatbázis lekérdezésekor" });
        }

        let tableName;
        if (results[0].ferfi > 0) {
            tableName = "ferfi_meretek";
        } else if (results[1].noi > 0) {
            tableName = "noi_meretek";
        } else {
            return res.status(404).json({ error: "Ehhez a cipőhöz nincs elérhető méret." });
        }

        const query = `SELECT meret, keszlet FROM ${tableName} WHERE cipo_id = ? ORDER BY meret ASC`;
        db.query(query, [cipoId], (err, meretResults) => {
            if (err) {
                console.error("❌ Méretlekérdezési hiba:", err);
                return res.status(500).json({ error: "Hiba az adatbázis lekérdezésekor" });
            }
            res.json(meretResults);
        });
    });
});

// 📌 API: Kosárba adás
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

// 🖥️ Statikus fájlok kiszolgálása a frontendhez
app.use(express.static(path.join(__dirname, "../kicksify_frontend")));

// 🌍 Index.html visszaküldése minden más GET kérésre
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../kicksify_frontend/index.html"));
});

// 🚀 Szerver indítása
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
