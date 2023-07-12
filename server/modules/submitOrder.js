const express = require('express');
const db = require('../modules/database');

const router = express.Router();

router.post('/', (req, res) => {
  const formData = req.body;
  db.query('SELECT id FROM users WHERE username = ?', formData.username, (error, results) => {
    if (error) {
      console.error('Error retrieving user data:', error);
      res.status(500).send('Error retrieving user data from the database');
    } else {
      if (results.length > 0) {
        const id_user = results[0].id;
        formData.id_user = id_user;

        formData.cart = JSON.stringify(formData.cart);

        // Inserează comanda în tabela "orders" cu id_user atribuit
        db.query('INSERT INTO orders SET ?', formData, (error, results) => {
          if (error) {
            console.error('Error inserting data:', error);
            res.status(500).send('Error inserting data into the database');
          } else {
            console.log('Data inserted successfully');

            const orderId = results.insertId; // ID-ul comenzii recent inserate

            const cartData = formData.cart;
            const cartItems = JSON.parse(cartData);

            // Procesează fiecare produs din cart
            for (const productId in cartItems) {
              const quantity = cartItems[productId];

              // Inserează în tabela "order_cart" legătura între comandă și produs
              const orderCartData = {
                order_id: orderId,
                product_id: productId,
                quantity: quantity
              };

              db.query('INSERT INTO order_cart SET ?', orderCartData, (error, results) => {
                if (error) {
                  console.error('Error inserting data into order_cart:', error);
                } else {
                  console.log('Data inserted into order_cart successfully');
                }
              });
            }

            res.status(200).send('Data inserted successfully');
          }
        });
      } else {
        res.status(400).send('Invalid username');
      }
    }
  });
});

module.exports = router;
