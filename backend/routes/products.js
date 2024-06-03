const router = require("express").Router();
const Product = require("../models/Product");
const Article = require("../models/Article");
const multer = require("multer");
const fs = require("fs");

const upload = multer({ dest: "data/" });

router.post("/upload-products", upload.single("file"), (req, res) => {
  const filePath = req.file.path;

  fs.readFile(filePath, "utf8", async (err, data) => {
    if (err) {
      return res.status(400).json("Error reading file: " + err);
    }

    try {
      const uploadData = JSON.parse(data).products;
      await Product.deleteMany({});
      await Product.insertMany(uploadData)
        .then(() => {
          fs.unlinkSync(filePath); // Remove the file after processing
          res.json("Products loaded successfully");
        })
        .catch((err) => res.status(400).json("Error loading Products: " + err));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});



// Get all products items

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get available products and their quantities
router.get("/inventory", async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find();

    // Map through each product and calculate the available quantity
    const availableProducts = await Promise.all(
      products.map(async (product) => {
        // Calculate the available quantity for this product
        const availableQuantity = await product.contain_articles.reduce(
          async (minQuantity, component) => {
            // Find the article associated with the current component
            const article = await Article.findOne({ art_id: component.art_id });

            // Calculate the maximum possible quantity of the product that can be made with the current stock of this article
            const maxPossible = Math.floor(article.stock / component.amount_of);

            // Return the minimum value between the current minimum quantity and the max possible quantity
            return Math.min(await minQuantity, maxPossible);
          },
          Promise.resolve(Infinity)
        );

        // Return the product name and its available quantity
        return { product: product.name, availableQuantity };
      })
    );

    // Send the calculated available products as a JSON response
    res.json(availableProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/sell", async (req, res) => {
  const { productName } = req.body;

  try {
    // Find the product by its name
    const product = await Product.findOne({ name: productName });
    if (!product) {
      // If the product is not found, send a 404 response
      return res.status(404).json("Product not found");
    }

    // Retrieve the entire inventory of articles
    const inventory = await Article.find();

    // Check if all required articles are available in sufficient quantity
    const isAvailable = product.contain_articles.every((article) => {
      const inventoryItem = inventory.find(
        (item) => item.art_id === article.art_id
      );
      return inventoryItem && inventoryItem.stock >= article.amount_of;
    });

    if (!isAvailable) {
      // If any article is not available in sufficient quantity, send a 400 response
      return res.status(400).json("Insufficient stock");
    }

    // Deduct the required quantity from the stock of each article
    for (let article of product.contain_articles) {
      let inventoryItem = await Article.findOne({ art_id: article.art_id });
      inventoryItem.stock -= article.amount_of;
      await inventoryItem.save();
    }

    res.json("Product sold and inventory updated");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
