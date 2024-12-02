import Book from "../models/bookModel.js";

const createBook = async (req, res) => {
  try {
    const { title, author, genre, availability } = req.body;

    const book = new Book({ title, author, genre, availability });
    await book.save();

    res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating book", details: error.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching books", details: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching book", details: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updateBook = await Book.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updateBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book updated successfully", updateBook });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating book", details: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const Deletebook = await Book.findByIdAndDelete(id);
    if (!Deletebook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully", deleteBook });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting book", details: error.message });
  }
};

export { createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,}
