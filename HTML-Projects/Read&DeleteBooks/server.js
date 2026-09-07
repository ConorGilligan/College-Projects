const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const PORT = 3000;
app.use(express.json());




const db = new sqlite3.Database("./database.db");
const allowedStatus = ["to-read", "reading", "completed"];




db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      year INTEGER,
      status TEXT NOT NULL CHECK(status IN ('to-read', 'reading', 'completed'))
    )`
  );                 // Create books table

  db.get("SELECT COUNT(*) AS count FROM books", (err, row) => {          // Add 2 books only if table is empty
    if (err) {
      console.log(err.message);
      return;
    }

    if (row.count === 0) {
      db.run(
        "INSERT INTO books (title, author, year, status) VALUES (?, ?, ?, ?)",
        ["The Hobbit", "J.R.R. Tolkien", 1937, "to-read"]
      );

      db.run(
        "INSERT INTO books (title, author, year, status) VALUES (?, ?, ?, ?)",
        ["Atomic Habits", "James Clear", 2018, "reading"]
      );
    }
  });
});

app.get("/books", (req, res) => {
  const status = req.query.status;

  if (status) {                                  // GET all books
    if (!allowedStatus.includes(status)) {       // Also supports: /books?status=reading
      return res.status(400).json({ error: "Invalid status value" });
    }
    db.all("SELECT * FROM books WHERE status = ?", [status], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  } else {
    db.all("SELECT * FROM books", [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  }
});







app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM books WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });              // GET one book by ID
    }
    if (!row) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(row);
  });
});






app.post("/books", (req, res) => {
  const { title, author, year, status } = req.body;

  if (!title || !author || !status) {
    return res.status(400).json({
      error: "title, author and status are required"
    });
  }
  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }                                                                         // POST add new book
  db.run(
    "INSERT INTO books (title, author, year, status) VALUES (?, ?, ?, ?)",
    [title, author, year, status],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        message: "Book added successfully",
        id: this.lastID
      });
    }
  );
});












app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  const { title, year, status } = req.body;

  if (status && !allowedStatus.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }
  db.get("SELECT * FROM books WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });                  // PUT update book
    }

    if (!row) {
      return res.status(404).json({ error: "Book not found" });
    }


    const newTitle = title !== undefined ? title : row.title;
    const newYear = year !== undefined ? year : row.year;
    const newStatus = status !== undefined ? status : row.status;



    db.run(
      "UPDATE books SET title = ?, year = ?, status = ? WHERE id = ?",
      [newTitle, newYear, newStatus, id],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.json({ message: "Book updated successfully" });
      }
    );
  });
});








app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM books WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }                                                                   // DELETE book
    if (this.changes === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  });
});













// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});