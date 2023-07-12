const mysql = require("mysql2/promise");
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");

const dbConfig = {
        user: "root",
        host: "localhost",
        password: "licenta",
        database: "makeawishdb",
};

const handleLogout = async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  try {
    // Check if refreshToken exists in the database
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE refreshToken = ?",
      [refreshToken]
    );

    if (rows.length === 0) {
      res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
      return res.sendStatus(204);
    }

    // Delete refreshToken in the database
    await connection.execute(
      "UPDATE users SET refreshToken = '' WHERE refreshToken = ?",
      [refreshToken]
    );

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
  } catch (error) {
    console.error("Error during logout:", error);
    res.sendStatus(500); // Internal Server Error
  } finally {
    connection.end();
  }
};

module.exports = { handleLogout };
