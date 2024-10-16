const express = require("express");
const database = require("../db");
const router = express.Router();

// Get all todos
router.get("/", (req, res) => {
  database.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) {
      console.error(err.message); // Log the error
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Create a new todo
router.post("/", (req, res) => {
  const { title } = req.body;
  const sql = "INSERT INTO todos (title) VALUES (?)";
  database.run(sql, [title], function (err) {
    if (err) {
      console.error(err.message); // Log the error
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID }); // Use 201 status code for creation
  });
});

// Update a todo
router.put("/:id", (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;
  const sql = "UPDATE todos SET completed = ? WHERE id = ?";
  database.run(sql, [completed, id], (err) => {
    if (err) {
      console.error(err.message); // Log the error
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: "Task updated successfully" });
  });
});

// Delete a todo
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM todos WHERE id = ?";
  database.run(sql, id, (err) => {
    if (err) {
      console.error(err.message); // Log the error
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: "Task deleted successfully" }); // Fix typo
  });
});

module.exports = router;
