const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    role: String,
    email: String,
    password: String,
    token: String,
    
    confirmationCode: String,
    isConfirmed: Boolean
    
});

module.exports = mongoose.model('User', userSchema);
