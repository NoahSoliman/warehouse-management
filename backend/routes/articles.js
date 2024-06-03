const router = require("express").Router();
const Article = require("../models/Article");
const multer = require("multer");
const fs = require("fs");

const upload = multer({ dest: "data/" });

router.post("/upload-articles", upload.single("file"), (req, res) => {
  const filePath = req.file.path;

  fs.readFile(filePath, "utf8", async (err, data) => {
    if (err) {
      return res.status(400).json("Error reading file: " + err);
    }

    try {
      const uploadData = JSON.parse(data).inventory;
      await Article.deleteMany({});
      await Article.insertMany(uploadData)
        .then(() => {
          fs.unlinkSync(filePath); // Remove the file after processing
          res.json("Articles loaded successfully");
        })
        .catch((err) => res.status(400).json("Error loading articles: " + err));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

 
  });
});


// Get all articles items
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
