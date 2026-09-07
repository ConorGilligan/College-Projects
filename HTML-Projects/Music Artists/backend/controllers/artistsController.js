const db = require("../db");




exports.getAll = (req, res) =>{
  db.all("SELECT * FROM artists", (err, rows) => {
    if (err){
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};






exports.getOne = (req, res) => {
  db.get("SELECT * FROM artists WHERE id = ?", [req.params.id], (err, row) => {
    if (err){
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
};






exports.create = (req, res) =>{
  const { name, genre, listeners } = req.body;

  db.run(
    "INSERT INTO artists (name, genre, listeners) VALUES (?, ?, ?)",
    [name, genre, listeners],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }res.json({ message: "created", id: this.lastID });
    }
  );
};






exports.update = (req, res) => {
  const { name, genre, listeners } = req.body;

  db.run(
    "UPDATE artists SET name = ?, genre = ?, listeners = ? WHERE id = ?",
    [name, genre, listeners, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "updated" });
    }
  );
};






exports.remove = (req, res) =>{
  db.run(
    "DELETE FROM artists WHERE id = ?",
    [req.params.id],
    function (err){
      if (err) {
        return res.status(500).json({ error: err.message });
      }res.json({ message: "deleted" });
    }
  );
};