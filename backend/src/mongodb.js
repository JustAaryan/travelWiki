const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Login")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });

const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Assuming email should be unique
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'], // Assuming three options for gender
        required: true
    }
});

const collection = mongoose.model("Logininfo", Loginschema);

module.exports = collection;
