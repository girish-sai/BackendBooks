const express = require('express');
const { getBooks,createBook,getBooksById,updateBook,deleteBook } = require('../controllers/booksController');
const authUser = require('../middleware/userMiddleware');

const router = express.Router();

router.use(authUser)
router.get('/', getBooks);

router.post('/', createBook);

router.get('/:id', getBooksById);

router.put('/:id', updateBook);

router.delete('/:id', deleteBook);

module.exports= router;