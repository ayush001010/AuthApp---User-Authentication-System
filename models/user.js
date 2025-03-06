const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/authApp';

mongoose.connect(`mongodb://localhost:27017/authApp`);

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number
})

module.exports = mongoose.model("user", userSchema);