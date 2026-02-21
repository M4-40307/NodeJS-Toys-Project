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
        unique: true, 
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024 
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'], 
        default: 'USER' 
    }
}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);

module.exports = User;
