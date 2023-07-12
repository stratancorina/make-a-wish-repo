require("dotenv").config();

const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const multer = require("multer");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./modules/database");

const authController = require("./controllers/authController");
const registerController = require("./controllers/registerrController");
const refreshTokenController = require("./controllers/refreshTokenController");
const logoutController = require("./controllers/logoutController");

const credentials = require("./middleware/credentials");

const photosRouter = require("./modules/photos");
const sumbitOrder = require("./modules/submitOrder");
const orderRoutes = require("./modules/orderRoutes");
const productRouter = require("./modules/productRoutes");
const usersRouter = require("./modules/usersRoutes");
const forgotPassword = require("./modules/forgotPassword");
const reviews = require("./modules/reviews");
const delivery = require("./modules/deliveryType");


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//     credentials: true
// }));

// OPENAI

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/api/ask-question", async (req, res) => {
  const question = req.body.question;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    max_tokens: 200,
  });
  const response = completion.data.choices[0].text;
  res.json({ response });
});

app.post("/auth", authController.handleLogin);
app.post("/register", registerController.handleNewUser);
app.get("/refresh", refreshTokenController.handleRefreshToken);
app.get("/logout", logoutController.handleLogout);

//photos
app.use("/photos", photosRouter);
app.use("/submit-form", sumbitOrder);
app.use("/orders", orderRoutes);
app.use("/products", productRouter);
app.use("/users", usersRouter);
app.use("/", forgotPassword);
app.use("/", reviews);
app.use("/", delivery);

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

app.post("/order-photos", upload.single("image"), (req, res) => {
  const { order_id, upload_date } = req.body;

  const image = req.file.filename;

  if (!order_id || !upload_date || !image) {
    res
      .status(422)
      .json({ status: 422, message: "Please fill all the details" });
    return;
  }

  const imagePath = req.file.path;
  const imageData = fs.readFileSync(imagePath);

  const sql =
    "INSERT INTO order_photos (order_id, image, upload_date ) VALUES (?, ?, ?)";
  const values = [order_id, imageData, upload_date];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error inserting the product" });
      return;
    }

    // res.status(200).json({ message: "Product added successfully" });

    const updateSql = "UPDATE orders SET status = 'completed' WHERE id = ?";
    const updateValues = [order_id];

    db.query(updateSql, updateValues, (updateErr, updateResult) => {
      if (updateErr) {
        console.error(updateErr);
        res.status(500).json({ message: "Error updating the order status" });
        return;
      }

      res.status(200).json({ message: "Product added successfully" });
    });
  });
});

app.get("/photos_orders", (req, res) => {
  db.query("SELECT * FROM order_photos", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/photos_orders/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM order_photos WHERE order_id = '${id}'`;

  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error retrieving orders");
    } else {
      res.send(results); // Send all the retrieved orders
    }
  });
});


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3001, () => {
  console.log("running server");
});
