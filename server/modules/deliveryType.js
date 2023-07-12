const express = require('express');
const db = require('./database');

const router = express.Router();

router.get('/deliverytype', (req ,res)=>{
    const query = `SELECT * FROM delivery_type`;
  
    db.query(query, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error retrieving orders');
      } else {
        res.send(results); 
      }
    });

})
module.exports = router;