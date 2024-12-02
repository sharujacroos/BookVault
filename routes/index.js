import express from "express";
import userRoutes from '../routes/userRoutes.js';
import borrowRoutes from '../routes/borrowRoutes.js';
import bookRoutes from '../routes/bookRoutes.js';

const router = express.Router()

router.use('/api/users', userRoutes);
router.use('/api/borrows', borrowRoutes);
router.use('/api/books', bookRoutes);
export default router;