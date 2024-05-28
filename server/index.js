const express = require("express");
const app = express();
const cors = require("cors");
const { query, checkDatabaseConnection } = require("./db");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json()); // req.body

// Check database connection
checkDatabaseConnection();

// ROUTES //

// Create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    const newTodo = await query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res
      .status(201)
      .json({ message: "Todo created successfully", todo: newTodo.rows[0] });
  } catch (err) {
    console.error("Error creating todo", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await query("SELECT * FROM todo");
    if (!Array.isArray(allTodos.rows)) {
      console.error("Invalid data format: Expected an array");
      return res
        .status(500)
        .json({ error: "Invalid data format: Expected an array" });
    }
    res.status(200).json(allTodos.rows);
  } catch (err) {
    console.error("Error fetching todos", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await query("SELECT * FROM todo WHERE todo_id = $1", [id]);

    if (todo.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(todo.rows[0]);
  } catch (err) {
    console.error("Error fetching todo", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    const updateResult = await query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id]
    );

    if (updateResult.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      todo: updateResult.rows[0],
    });
  } catch (err) {
    console.error("Error updating todo", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResult = await query(
      "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
      [id]
    );

    if (deleteResult.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("Error deleting todo", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
