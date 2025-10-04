const express = require('express');
const { getBooks,createBook,getBooksById,updateBook,deleteBook } = require('../controllers/booksController');
const authUser = require('../middleware/userMiddleware');

const router = express.Router();


router.get('/', getBooks);

router.post('/',authUser, createBook);

router.get('/:id', getBooksById);

router.put('/:id',authUser, updateBook);

router.delete('/:id',authUser, deleteBook);

module.exports= router;