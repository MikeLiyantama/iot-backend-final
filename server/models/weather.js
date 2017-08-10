var mongoose = require("mongoose");

// Mongoose Models
var Weather = mongoose.model("Weather", {
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    information: {
        type: String
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = {Weather};