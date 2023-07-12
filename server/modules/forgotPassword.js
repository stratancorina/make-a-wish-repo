const express = require("express");
const router = express.Router();
const db = require("./database");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require('nodemailer');

// Configurarea transporterului de email
// const transporter = nodemailer.createTransport({
//   service: 'Gmail', // Exemplu: Gmail, Yahoo, etc.
//   auth: {
//     user: 'surprize.calarasi@gmail.com',
//     pass: 'Qwerty!2',
//   },
// });

router.get("/forgot-password", (req, res, next) => {});

router.post("/forgot-password", (req, res, next) => {
  const { email } = req.body;
  const query = `SELECT * FROM users WHERE email = '${email}'`;
  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    } else {
      if (results.length === 0) {
        console.log("Email not found in the database");
        res.status(404).send("Email not found");
      } else {
        res.status(200);
        console.log(
          "found email in the db with the username",
          results[0].username
        );
        let user = results[0];

        const secret = process.env.ACCESS_TOKEN_SECRET + user.password;

        const payload = {
          email: user.email,
          id: user.id,
        };

        const token = jwt.sign(payload, secret, { expiresIn: "10m" });

        const link = `http://localhost:3000/reset-password/${user.id}/${token}`;

        console.log(link);

        //send email to the client
        res.send("password reset link has been sent to your email");
      }
    }
  });

  // console.log(password)
});
router.get("/reset-password/:id/:token", (req, res, next) => {
  const { id, token } = req.params;
  res.send(req.params);

  const query = `SELECT * FROM users WHERE id = '${id}'`;
  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    } else {
      if (results.length === 0) {
        console.log("usen not found in the database");
        res.status(404).send("user not found");
      } else {
        res.status(200);
        console.log(
          "found user in the db with the username",
          results[0].username
        );
        let user = results[0];

        console.log(user);

        const secret = process.env.ACCESS_TOKEN_SECRET + user.password;

        try {
          const payload = jwt.verify(token, secret);
          console.log("reset-password");
        } catch (error) {
          console.log(error.message);
          res.send(error.message);
        }
      }
    }
  });
});
router.post("/reset-password/:id/:token", async (req, res, next) => {
    try {
      const { id, token } = req.params;
      const { newPassword, newPassword2 } = req.body;
  
      const query = `SELECT * FROM users WHERE id = '${id}'`;
      db.query(query, async (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Internal server error");
        }
  
        if (results.length === 0) {
          console.log("User not found in the database");
          return res.status(404).send("User not found");
        }
  
        console.log("Found user in the db with the username", results[0].username);
        let user = results[0];
        const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
  
        try {
          const payload = jwt.verify(token, secret);
          if (newPassword == newPassword2) {
            console.log("Passwords match");
  
            const hashedPwd = await bcrypt.hash(newPassword, saltRounds);
            console.log("Encrypting the password");
  
            console.log(hashedPwd);
  
            db.query(
              "UPDATE users SET password = ? WHERE id = ?;",
              [hashedPwd, user.id],
              (error) => {
                if (error) {
                  console.error("Error executing MySQL query:", error);
                  return res.sendStatus(500); // Internal Server Error
                }
  
                return res.status(200).json({ success: "Password updated successfully!" });
              }
            );
          } else {
            return res.status(400).send("Passwords do not match");
          }
        } catch (error) {
          console.log(error.message);
          return res.status(400).send(error.message);
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
      return res.status(500).send("Internal server error");
    }
  });
  

module.exports = router;
