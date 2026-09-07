const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const db = new sqlite3.Database("./data/app.db");
db.run("PRAGMA foreign_keys = ON");

const sql = fs.readFileSync("./model.sql").toString();
db.exec(sql);

module.exports = db;