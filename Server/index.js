const express = require("express");
const mysql = require("mysql");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

// middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "Betselot49",
  password: "@betselot49",
  database: "TodoApp",
});

connection.connect((err) => {
  console.log("Database connection established");
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// ------------------ Signup post methode ----------------

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const query = `INSERT INTO account (username, password) VALUES ('${username}', '${password}')`;
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    }

    if (rows && rows.affectedRows === 1) {
      res.send({ message: "OK" });
    } else {
      res.send({ message: "USER EXISTS" });
    }
  });
});

// ------------------  Login get method ------------------

app.post("/login", function (req, res) {
  const { username, password } = req.body;

  const query = `SELECT * FROM account WHERE username = '${username}'`;
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    }

    if (rows.length === 0) {
      res.send({ message: "username not found, signup first" });
    } else if (rows && rows[0].password === password) {
      res.send({ message: "OK" });
    } else {
      res.send({ message: "invalid passowrd!" });
    }
  });
});

// -----------  Add new task ---------------------------

app.post("/addTask", (req, res) => {
  const { username, title, description, starting_date, deadline } = req.body;
  const query = `INSERT INTO todos (username, title, description, starting_date, deadline) VALUES ('${username}','${title}', '${description}', '${starting_date}', '${deadline}')`;
  connection.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
    if (rows && rows.affectedRows === 1) {
      res.send({ message: "OK" });
    } else {
      res.send({ message: "New task was not added" });
    }
  });
});

// ----------------  fetch tasks --------------------------------

app.get("/tasks", (req, res) => {
  const { username } = req.query;
  if (username === "undefined") {
    console.log("user does not exist");
  } else {
    const query = `SELECT * FROM todos WHERE username = '${username}'`;
    connection.query(query, (err, rows, filds) => {
      if (err) {
        console.log(err);
      }
      res.send(rows);
    });
  }
});

// ---------------- add to favorites --------------------

app.put("/addtofav", (req, res) => {
  const { id, favorite } = req.body;
  const query = `UPDATE todos SET favorite = '${favorite}' WHERE id = '${id}'`;
  connection.query(query, (err, rows, files) => {
    if (err) {
      console.log(err);
    }

    if (rows && rows.affectedRows === 1) {
      res.send({ message: "OK" });
    } else {
      res.send({ message: "FAVORITE UNSET" });
    }
  });
});

// ----------------  mark us done ----------------

app.put("/markusdone", (req, res) => {
  const { id, done } = req.body;
  const query = `UPDATE todos SET done = '${done}' WHERE id = '${id}'`;
  connection.query(query, (err, rows, files) => {
    if (err) {
      console.log(err);
    }

    if (rows && rows.affectedRows === 1) {
      res.send({ message: "OK" });
    } else {
      res.send({ message: "FAVORITE UNSET" });
    }
  });
});

// -------------- delete one -------------------------

app.delete("/deleteOne", (req, res) => {
  const { id } = req.query;
  console.log(id);

  const query = `DELETE FROM todos WHERE id = '${id}'`;
  connection.query(query, (err, rows) => {
    if (rows && rows.affectedRows === 1) {
      res.send({ message: "OK" });
    } else {
      res.send({ message: "NOT DELETED" });
    }
  });
});

// ---------------- find One ---------------------------

app.get("/findOne", (req, res) => {
  const { id } = req.query;
  console.log(id);
  const query = `SELECT * FROM todos WHERE id = '${id}'`;
  connection.query(query, (err, rows) => {
    if (err) {
      console.error(err);
    }

    console.log(rows);
    if (rows && rows[0].id == id) {
      res.send({ message: rows[0] });
    } else {
      res.send({ message: "NO TASK FOUND" });
    }
  });
});

// Edit task

app.put("/editTask", (req, res) => {
  const { id, title, description, deadline } = req.body;
  const query = `UPDATE todos SET title = '${title}', description = '${description}', deadline = '${deadline}' WHERE id = '${id}';`;
  connection.query(query, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ message: "OK"});
    }
  })
});

//  ------------------- GET FAVORITE TASKS  -------------------

app.get("/getFav", (req, res) => {
  const { username, favorite } = req.query;
  console.log(username, favorite);
  const query = `SELECT * FROM todos WHERE username = '${username}' AND favorite = '${favorite}'`;
  connection.query(query, (err, rows) => {
    if (err) {
      console.error(err);
    }
    console.log("----------- Favorite-------------\n ");
    console.log(rows);
    if (rows) {
      res.send(rows);
    } else {
      res.send({ message: "NO TASK FOUND" });
    }
  });
});

// ----------------------   GET DONE TASKS ----------------

app.get("/getDone", (req, res) => {
  const { username, done } = req.query;

  const query = `SELECT * FROM todos WHERE username = '${username}' AND done = '${done}'`;
  connection.query(query, (err, rows) => {
    if (err) {
      console.error(err);
    }

    console.log("---------------  DONE TASKS ----------------\n  ");
    console.log(rows);

    if (rows) {
      res.send(rows);
    } else {
      res.send({ message: "NO TASK FOUND" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
