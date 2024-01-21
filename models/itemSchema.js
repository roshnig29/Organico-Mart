const mongoose = require('mongoose');

// Define the item schema
const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Create the item model
const Item = mongoose.model('items', itemSchema);

module.exports = Item;
