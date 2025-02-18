const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL adatbázis kapcsolat
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "kicksify"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("✅ Connected to MySQL Database");
});

// API végpont: Cipők lekérése
app.get("/api/cipok", (req, res) => {
    let query = "SELECT * FROM cipok";
    if (req.query.marka) {
        query += " WHERE marka = " + mysql.escape(req.query.marka);
    }
    db.query(query, (err, results) => {
        if (err) {
            console.error("API hiba: ", err);
            return res.status(500).json({ error: "Hiba az adatbázis lekérdezés során" });
        }
        res.json(results);
    });
});

// Statikus fájlok kiszolgálása a frontendhez
app.use(express.static(path.join(__dirname, "../kicksify_frontend")));

// Minden egyéb GET kérésnél az index.html-t küldjük vissza
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../kicksify_frontend/index.html"));
});

// Szerver indítása a 5000-es porton
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
