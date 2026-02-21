const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length
        maxlength: 1024 // Max length for hashed password
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'], // Only 'USER' or 'ADMIN' allowed
        default: 'USER' // Default role is USER
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const User = mongoose.model('User', userSchema);

module.exports = User;
