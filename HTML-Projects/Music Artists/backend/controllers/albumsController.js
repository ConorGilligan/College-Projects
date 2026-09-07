const db = require("../db");

exports.getAll = (req, res) =>{
  db.all("SELECT * FROM albums", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};







exports.getOne = (req, res) => {
  db.get("SELECT * FROM albums WHERE id = ?", [req.params.id], (err, row) => {
    if (err){
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
};








exports.create = (req, res) =>{
  const { name, year, listens, artist_id } = req.body;

  db.run(
    "INSERT INTO albums (name, year, listens, artist_id) VALUES (?, ?, ?, ?)",
    [name, year, listens, artist_id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }res.json({ message: "created", id: this.lastID });
    }
  );
};








exports.update = (req, res) =>{
  const { name, year, listens, artist_id } = req.body;

  db.run(
    "UPDATE albums SET name = ?, year = ?, listens = ?, artist_id = ? WHERE id = ?",
    [name, year, listens, artist_id, req.params.id],
    function (err){
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "updated" });
    }
  );
};







exports.remove = (req, res) => {
  db.run(
    "DELETE FROM albums WHERE id = ?",
    [req.params.id],
    function (err){
      if (err){
        return res.status(500).json({ error: err.message });
      }res.json({ message: "deleted" });
    }
  );
};