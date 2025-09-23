
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [1, 'Title must be at least 1 character long'],
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        minlength: [1, 'Author name must be at least 1 character long'],
        maxlength: [100, 'Author name cannot exceed 100 characters']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        trim: true,
        enum: {
            values: ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Biography', 'History', 'Self-Help', 'Children', 'Poetry', 'Drama', 'Other'],
            message: 'Genre must be one of the predefined categories'
        }
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
        max: [10000, 'Price cannot exceed $10,000'],
        validate: {
            validator: function(value) {
                // Check if price has at most 2 decimal places
                return /^\d+(\.\d{1,2})?$/.test(value.toString());
            },
            message: 'Price can have at most 2 decimal places'
        }
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Book = mongoose.model('Book', bookSchema);


module.exports = Book;