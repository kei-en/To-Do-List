const request = require("supertest");
const express = require("express");
const database = require("../db");
const todoRoutes = require("./todoRoutes");

jest.mock("../db");

const app = express();
app.use(express.json());
app.use("/todos", todoRoutes);

describe("Todo Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /todos - should return all todos", async () => {
    const mockTodos = [{ id: 1, title: "Test Todo", completed: false }];
    database.all.mockImplementation((_sql, _params, callback) => {
      callback(null, mockTodos);
    });

    const response = await request(app).get("/todos");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTodos);
    expect(database.all).toHaveBeenCalledWith(
      "SELECT * FROM todos",
      [],
      expect.any(Function)
    );
  });

  test("POST /todos - should create a new todo", async () => {
    const newTodo = { title: "New Todo" };
    database.run.mockImplementation((_sql, _params, callback) => {
      callback(null);
    });

    const response = await request(app).post("/todos").send(newTodo);

    expect(response.status).toBe(201);
    expect(database.run).toHaveBeenCalledWith(
      "INSERT INTO todos (title) VALUES (?)",
      [newTodo.title],
      expect.any(Function)
    );
  });

  test("PUT /todos/:id - should update a todo", async () => {
    const updatedTodo = { completed: true };
    const todoId = "1";
    database.run.mockImplementation((_sql, _params, callback) => {
      callback(null);
    });

    const response = await request(app)
      .put(`/todos/${todoId}`)
      .send(updatedTodo);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Task updated successfully" });
    expect(database.run).toHaveBeenCalledWith(
      "UPDATE todos SET completed = ? WHERE id = ?",
      [updatedTodo.completed, todoId],
      expect.any(Function)
    );
  });

  test("DELETE /todos/:id - should delete a todo", async () => {
    const todoId = "1";
    database.run.mockImplementation((_sql, _params, callback) => {
      callback(null);
    });

    const response = await request(app).delete(`/todos/${todoId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Task deleted successfully" });
    expect(database.run).toHaveBeenCalledWith(
      "DELETE FROM todos WHERE id = ?",
      todoId,
      expect.any(Function)
    );
  });
});
