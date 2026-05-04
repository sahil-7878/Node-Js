const Book = require('../models/Book');
const fs = require('fs');
const path = require('path');

const uploadsFolder = path.join(__dirname, '..', 'uploads');

exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.render('books/index', { books });
};

exports.getAddForm = (req, res) => {
  res.render('books/add');
};

exports.addBook = async (req, res) => {
  const { title, author, category, price, quantity, description } = req.body;
  const coverImage = req.file ? req.file.filename : '';
  const book = new Book({ title, author, category, price, quantity, description, coverImage });
  await book.save();
  res.redirect('/books');
};

exports.getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('books/show', { book });
};

exports.getEditForm = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('books/edit', { book });
};

exports.updateBook = async (req, res) => {
  const { title, author, category, price, quantity, description } = req.body;
  const book = await Book.findById(req.params.id);

  if (req.file) {
    if (book.coverImage) {
      fs.unlink(path.join(uploadsFolder, book.coverImage), () => {});
    }
    book.coverImage = req.file.filename;
  }

  book.title = title;
  book.author = author;
  book.category = category;
  book.price = price;
  book.quantity = quantity;
  book.description = description;

  await book.save();
  res.redirect('/books');
};

exports.deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book.coverImage) {
    fs.unlink(path.join(uploadsFolder, book.coverImage), () => {});
  }
  await Book.findByIdAndDelete(req.params.id);
  res.redirect('/books');
};