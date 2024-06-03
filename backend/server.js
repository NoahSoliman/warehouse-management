

const express = require("express");
require('dotenv').config(); // Load environment variables from .env file

const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Atlas connection

  const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("An error occurred when connecting to the database",err));

const articleRoutes = require("./routes/articles");
const productRoutes = require("./routes/products");

app.get("/", async (req, res) => {
  try {
    res.json("Welcome to server");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.use("/api/articles", articleRoutes);
app.use("/api/products", productRoutes);

//

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});



module.exports = app;