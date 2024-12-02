import Borrow from "../models/borrowModel.js";
import Book from "../models/bookModel.js";

const borrowBook = async (req, res) => {
  try {
    const { bookId, userId } = req.body;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (!book.availability) {
      return res.status(400).json({ error: "Book is not available" });
    }

    //Create a new borrow record
    constborrow = await Borrow.create({ userId, bookId });

    //Update book availability
    book.availability = false;
    await book.save();

    res.status(201).json({
      message: "Book borrowed successfully",
      borrow,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error borrowing book", details: error.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.params;
    const borrow = await Borrow.findById(borrowId);
    if (!borrow) {
      return res.status(404).json({ error: "Borrow not found" });
    }

    if (borrow.isReturned) {
      return res.status(400).json({ error: "Book has already been returned" });
    }
    borrow.isReturned = true;
    await borrow.save();

    const book = await Book.findById(borrow.bookId);
    if (book) {
      book.availability = true;
      await book.save();
    }

    res.status(200).json({
      message: "Book returned Successfully",
      borrow,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error returning book", details: error.message });
  }
};

const getBorrowHistory = async (req, res) => {
  try {
    const userId = req.params;
    const borrowHistory = await Borrow.find({ userId })
      .populate("bookId", "title author")
      .sort({ borrowDate: -1 });

    res.status(200).json({
      message: "Borrow history retrieved successfully",
      borrowHistory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving borrow history", details: error });
  }
};

const getActiveBorrows = async (req, res) => {
  try {
    const activeBorrows = await Borrow.find({ isReturned: false })
      .populate("bookId", "title author")
      .populate("userId", "firstname lastname email");

    res.status(200).json({
      message: "Active borrows retrieved successfully",
      activeBorrows,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving active borrows",
      details: error.message,
    });
  }
};

export { borrowBook, returnBook, getBorrowHistory, getActiveBorrows };
