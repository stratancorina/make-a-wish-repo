const bcrypt = require("bcrypt");
const mysql = require("mysql2");

const saltRounds = 10;

const db = require("../modules/database");

const handleNewUser = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    async (error, results) => {
      if (error) {
        console.error("Error executing MySQL query:", error);
        return res.sendStatus(500); // Internal Server Error
      }
      if (results.length > 0) {
        console.log("este deja asa utilizator in baza de date")
        return res.sendStatus(409).json({ message: "este deja asa utilizator in baza de date" });
      }

      try {
        
        const hashedPwd = await bcrypt.hash(password, saltRounds);

        db.query(
          'INSERT INTO users (username, password, role, email) VALUES (?, ?, ?, ?);',
          [username, hashedPwd, 'user', email],
          (error) => {
            if (error) {
              console.error("Error executing MySQL query:", error);
              return res.sendStatus(500); // Internal Server Error
            }

            res.status(201).json({ success: `New user ${username} created!` });
          }
        );
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  );
};

module.exports = { handleNewUser };
