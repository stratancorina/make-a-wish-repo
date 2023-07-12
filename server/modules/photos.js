
const express = require('express');
const db = require('../modules/database');

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT idphotos, title, image, date, category FROM photos', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
