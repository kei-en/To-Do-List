const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");
const app = express();

const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/todos", todoRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
