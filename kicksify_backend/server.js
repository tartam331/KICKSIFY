const express = require("express");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Statikus fájlok kiszolgálása a frontendhez
app.use(express.static(path.join(__dirname, "../kicksify_frontend")));

// Ha nincs találat, az index.html-t küldjük vissza
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../kicksify_frontend/index.html"));
});

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

// Szerver indítása
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
