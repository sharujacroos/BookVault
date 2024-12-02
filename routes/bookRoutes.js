import express from "express"
import {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
} from '../controllers/bookController.js';

const router = express.Router();

router.post('/createBook', createBook);
router.get('/getAllBooks', getAllBooks);
router.get('/getBook/:id', getBookById)
router.put('/updateBook/:id', updateBook);
router.delete('/deleteBook/:id', deleteBook);

export default router;