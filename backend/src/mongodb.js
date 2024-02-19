const mongoose = require("mongoose");

mongoose.connect("aryan981396:oqdW9ly32133JrLE@cluster0.u9ptne7.mongodb.net/")
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
