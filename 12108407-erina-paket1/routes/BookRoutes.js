import express from 'express';
import { 
    createBooks, 
    getBooks,
    getBooksById,
    updateBooks,
    deleteBooks,
    getUserBooks
} from '../controller/BooksController.js';

const router = express.Router();
router.get ('/books', getBooks);
router.get ('/books/:id', getBooksById);
router.post('/books', createBooks);
router.patch('/books/:id', updateBooks);
router.delete('/books/:id', deleteBooks);
router.get('/userbook', getUserBooks);

export default router;