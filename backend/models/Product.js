const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number,  },
  contain_articles: [
    {
      art_id: { type: Number, required: true },
      amount_of: { type: Number, required: true }
    }
  ]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;



