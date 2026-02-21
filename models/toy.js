const mongoose = require('mongoose');

const toySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    info: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    category: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    img_url: {
        type: String,
        default: 'no_image.png' // Default image if not provided
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    user_id: {
        type: String, // Will store the ID of the user who added the toy
        required: true
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Toy = mongoose.model('Toy', toySchema);

module.exports = Toy;
