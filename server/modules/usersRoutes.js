const express = require("express");
const db = require("./database");

const router = express.Router();

router.get("/", (req, res) => {
  const query = `SELECT * FROM users`;

  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error retrieving users");
    } else {
      res.send(results);
    }
  });
});

module.exports = router;
