import express from 'express';
import {
    borrowBook,
    returnBook,
    getBorrowHistory,
    getActiveBorrows,
} from '../controllers/borrowController.js';

const router = express.Router();

router.post('/borrow', borrowBook);
router.put('/return/:borrowId', returnBook);
router.get('/history/:userId', getBorrowHistory);
router.get('/active', getActiveBorrows);

export default router;