const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { signedCookie } = require("cookie-parser");

const db = require('../modules/database');

const handleLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    async (error, results) => {
      if (error) {
        console.error("Error executing MySQL query:", error);
        return res.sendStatus(500); // Internal Server Error
      }

      const foundUser = results[0];

      if (!foundUser) return res.sendStatus(401); // Unauthorized

      const match = await bcrypt.compare(password, foundUser.password);

      if (match) {
        // Create JWTs
        // const { username, role } = foundUser;
        const accessToken = jwt.sign(
          {
            "UserInfo":{
              "username":foundUser.username,
              "role": foundUser.role,
            }
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15min" }
        );

        const refreshToken = jwt.sign(
          { username: foundUser.username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        // Update refreshToken in the database
        db.query(
          "UPDATE users SET refreshToken = ? WHERE username = ?",
          [refreshToken, foundUser.username],
          (err) => {
            if (err) {
              console.error(err);
              return res.sendStatus(500);
            }

            res.cookie("jwt", refreshToken, {
              httpOnly: true,
              sameSite: "None",
              // secure: false,
              maxAge: 24 * 60 * 60 * 1000,
              // path: "/",
            });
            
            console.log("refresh-token")
            console.log(refreshToken);

            //sending the accesstoken
            res.json({ accessToken: accessToken});
          }
        );
      } else {
        res.sendStatus(401);
      }
    }
  );
};

module.exports = { handleLogin };
