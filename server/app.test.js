const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/todos", todoRoutes);

describe("Express Server", () => {
  let server;

  beforeAll((done) => {
    server = app.listen(5001, () => {
      console.log("Test server running on port 5001");
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  test("should respond to GET /api/todos", async () => {
    const response = await request(app).get("/api/todos");
    expect(response.status).toBe(200);
  });

  test("should respond to POST /api/todos", async () => {
    const newTodo = { title: "Test Todo", completed: false };
    const response = await request(app)
      .post("/api/todos")
      .send(newTodo)
      .set("Accept", "application/json");
    expect(response.status).toBe(201);
  });
});
