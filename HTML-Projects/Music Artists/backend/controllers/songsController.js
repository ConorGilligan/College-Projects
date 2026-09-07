const db = require("../db");

exports.getAll = (req, res) =>{
  db.all("SELECT * FROM songs", (err, rows) => {
    if (err){
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

exports.getOne = (req, res) => {
  db.get("SELECT * FROM songs WHERE id = ?", [req.params.id], (err, row) => {
    if (err){
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
};

exports.create = (req, res) =>{
  const { name, year, album_id } = req.body;

  db.run(
    "INSERT INTO songs (name, year, album_id) VALUES (?, ?, ?)",
    [name, year, album_id],
    function (err) {
      if (err){
        return res.status(500).json({ error: err.message });
      }res.json({ message: "created", id: this.lastID });
    }
  );
};

exports.update = (req, res) =>{
  const { name, year, album_id } = req.body;

  db.run(
    "UPDATE songs SET name = ?, year = ?, album_id = ? WHERE id = ?",
    [name, year, album_id, req.params.id],
    function (err){
      if (err){
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "updated" });
    }
  );
};

exports.remove = (req, res) => {
  db.run(
    "DELETE FROM songs WHERE id = ?",
    [req.params.id],
    function (err){
      if (err){
        return res.status(500).json({ error: err.message });
      }res.json({ message: "deleted" });
    }
  );
};