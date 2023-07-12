const express = require('express');
const db = require('./database');

const router = express.Router();

router.get('/:username', (req, res) => {
  const { username } = req.params;
  
  // Query to retrieve the user ID based on the username
  const userQuery = `SELECT id FROM users WHERE username = '${username}'`;
  
  db.query(userQuery, (userError, userResults) => {
    if (userError) {
      console.error(userError);
      res.status(500).send('Error retrieving user data');
    } else {
      if (userResults.length > 0) {
        const userId = userResults[0].id;
        
        // Query to retrieve the products based on the user ID
        const productQuery = `SELECT * FROM orders WHERE id_user = ${userId}`;
        
        db.query(productQuery, (productError, productResults) => {
          if (productError) {
            console.error(productError);
            res.status(500).send('Error retrieving product data');
          } else {
            res.send(productResults);
          }
        });
      } else {
        res.status(404).send('User not found');
      }
    }
  });
});

  
  router.get('/', (req, res) => {
    const query = `SELECT * FROM orders`;
  
    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error retrieving orders');
      } else {
        res.send(results); 
      }
    });
  });

  module.exports = router;