const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookDataSchema = new Schema({
  photo: {
    data: Buffer,
    contentType: String,
  },
  bookName: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  // description: {
  //   type: String,
  //   required: true,
  // },
  price: {
    type: String,
    required: true,
  },
  tags: {
    type: Object,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  sold: {
    type: Number,
    default: 0,
  },
  link: {
    type: String,
    required: true,
  },
});

module.exports = book_model = mongoose.model("bookData", bookDataSchema);
