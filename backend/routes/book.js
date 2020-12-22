const express = require("express");
const router = express.Router();
const fs = require("fs");
const formidable = require("formidable");
const book = require("../models/book_model");

router.get("/", (req, res) => {
  book
    .find()
    // this below line is to not show the photo field in the postman , it is making front end fetching fast too !!!
    .select("-photo")
    //   booksData for all books
    .then((booksData) => res.json(booksData))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/addbook", (req, res) => {
  let bookFormData = new formidable.IncomingForm();
  bookFormData.keepExtensions = true;

  bookFormData.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with Image",
      });
    }
    //destructure the fields
    const { bookName, author, price, tags, stock } = fields;

    if (!bookName || !author || !price || !tags || !stock) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let product = new book(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    // console.log(product);

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving Book in DB failed",
        });
      }
      // book.findOne({bookName : bookName}).then //do the same book name validation here
      res.json(product);
    });
  });
  // const bookFormData = new book({
  //   photo: req.body.photo,
  //   bookName: req.body.bookName,
  //   author: req.body.author,
  //   price: req.body.price,
  //   tags: req.body.tags,
  //   stock: req.body.stock,
  // });
  // finding a book with the same name as provided in the input
  // if the book is found then message of book is already present will be given
  // if book with the same name is not found then a new book is added
});

router.put("/updateBook/:bookId", (req, res) => {
  const bookupdatedata = new book({
    _id: req.params.bookId,
    // photo : take image from the formdata
    bookName: req.body.bookName,
    author: req.body.author,
    price: req.body.price,
    tags: req.body.tags,
    stock: req.body.stock,
    link: req.body.link,
  });
  book
    .updateOne({ _id: req.params.bookId }, bookupdatedata)
    .then(() => {
      // .update()
      // .then(() => res.json(`${foundBook} Updated Successfully`))
      // .catch((err) => res.status(400).json("Error: " + err));
      res.json(`Successfully updated book: ${req.body.bookName}`);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/deleteBook/:bookId", (req, res) => {
  // let book = req.book;
  // taking the bookId from the parameter using req.params.bookId
  book.findById({ _id: req.params.bookId }).remove((err, deletedBook) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the book",
      });
    }
    res.json({
      message: "Book was deleted successfully",
      deletedBook,
    });
  });
});
router.get("/photo/:productId", (req, res) => {
  // var foundBook = book.findById({ _id: req.params.productId });
  book
    .findById({ _id: req.params.productId })
    .then((obj) => {
      res.set("Content-Type", obj.photo.contentType);
      return res.send(obj.photo.data);
    })
    .catch("There was some problem !");
  // res.json(req.params.productId);
  // if (foundBook.photo.data) {
  //   res.set("Content-Type", foundBook.photo.contentType);
  //   return res.send(foundBook.photo.data);
  // }
  // console.log(foundBook.photo);
});
router.get("/:id", (req, res) => {
  book
    .findById(req.params.id)
    .select("-photo")
    .then((book) => res.json(book))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
