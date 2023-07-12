const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const db = require('../modules/database');

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);

  if (!cookies?.jwt) return res.sendStatus(401);
  console.log("here2");

  // console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  db.query(
    "SELECT * FROM users WHERE refreshToken = ?",
    [refreshToken],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }

      const foundUser = results[0];
      console.log(foundUser);
      if (!foundUser) return res.sendStatus(403); // Forbidden

      // Verify JWT
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err || foundUser.username !== decoded.username)
            return res.sendStatus(403);

            // const { username, role } = foundUser;
          //   const roles = Object.values(foundUser.roles);
          const accessToken = jwt.sign(
            {
              "UserInfo":{
                "username":decoded.username,
                "role": foundUser.role,
              }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15min" }
          );
          res.json({ accessToken : accessToken, role: role});
        }
      );
    }
  );
};

module.exports = { handleRefreshToken };
