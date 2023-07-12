const express = require('express');
const db = require('./database');

const router = express.Router();

router.post('/reviews', (req, res) => {
    const { id_order, rating, review, username } = req.body;
    console.log(req.body)
    const date_review = new Date().toISOString().split('T')[0]; // Get today's date
  
    console.log(id_order, rating, review, username, date_review);
  
    const checkQuery = 'SELECT id_order FROM reviews WHERE id_order = ?';
    db.query(checkQuery, [id_order], (checkError, checkResult) => {
      if (checkError) {
        console.error('Error executing MySQL query:', checkError);
        return res.sendStatus(500); // Internal Server Error
      }
  
      if (checkResult.length > 0) {
        return res.status(400).json({ error: 'A review for this order already exists!' });
      }
  
      const insertQuery = 'INSERT INTO reviews (id_order, grade, text, date_review, user) VALUES (?, ?, ?, ?, ?)';
      db.query(insertQuery, [id_order, rating, review, date_review, username], (insertError, insertResult) => {
        if (insertError) {
          console.error('Error executing MySQL query:', insertError);
          return res.sendStatus(500); // Internal Server Error
        }
        res.status(200).json({ success: 'Review submitted successfully!' });
      });
    });
  });
  
  router.get('/reviews/:id', (req, res) => {
    const reviewId = req.params.id;
  
    const query = 'SELECT * FROM reviews WHERE id_order = ?';
    db.query(query, [reviewId], (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        return res.sendStatus(500); // Internal Server Error
      }
  
      if (results.length === 0) {
        // Review not found
        return res.sendStatus(404);
      }
  
      const review = results[0];
      res.status(200).json({ review });
    });
  });

  router.get('/reviews', (req,res) => {
    const query = 'SELECT * FROM reviews';
    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error retrieving revies');
      } else {
        res.send(results); 
      }
    });
  })
  

module.exports = router;