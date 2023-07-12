const express = require('express');
const multer = require('multer');
const fs = require('fs');
const db = require('./database');
 // Replace with your database connection setup

const router = express.Router();

const imgConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

// Image filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, Error("Only images are allowed"));
  }
};

const upload = multer({
  storage: imgConfig,
  fileFilter: isImage,
});

// GET all products
router.get('/', (req, res) => {
  db.query('SELECT id, name, description, price, image, category FROM products', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// POST a new product
router.post('/', upload.single("image"), (req, res) => {
  const { name, description, price, category } = req.body;
  console.log(req.body);
  console.log(req.file);
  const image = req.file.filename;

  if (!name || !price || !description || !category || !image) {
    res.status(422).json({ status: 422, message: "Please fill all the details" });
    return;
  }

  const imagePath = req.file.path;
  const imageData = fs.readFileSync(imagePath);

  const sql = "INSERT INTO products (name, description, price, category, image) VALUES (?, ?, ?, ?, ?)";
  const values = [name, description, price, category, imageData];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error inserting the product" });
      return;
    }

    res.status(200).json({ message: "Product added successfully" });
  });
});

// DELETE a product by ID
router.delete('/:id', (req, res) => {
  // Handle the product deletion logic
  // ...

  // Example implementation
  const productId = req.params.id;

  // Execute the delete query
  db.query('DELETE FROM products WHERE id = ?', [productId], (error, results) => {
    if (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ error: 'Failed to delete product' });
    }

    // Check if any rows were affected by the delete query
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Return success response
    return res.json({ message: 'Product deleted successfully' });
  });
});

module.exports = router;
