const sqlite3 = require("sqlite3").verbose();

const database = new sqlite3.Database("./todos.db", (err) => {
  if (err) {
    console.error("Error opening database: " + err.message);
  } else {
    database.serialize(() => {
      database.get(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='todos'",
        (err, row) => {
          if (err) {
            console.error("Error checking for table existence: " + err.message);
          } else if (!row) {
            database.run(
              "CREATE TABLE todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed BOOLEAN DEFAULT 0)",
              (err) => {
                if (err) {
                  console.error("Error creating table: " + err.message);
                } else {
                  console.log("Table 'todos' created successfully.");
                }
              }
            );
          } else {
            console.log("Table 'todos' already exists.");
          }
        }
      );
    });
  }
});

module.exports = database;
