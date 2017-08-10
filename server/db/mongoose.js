var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

var dbURL = process.env.MONGODB_URI || "mongodb://localhost:27017/WeatherCol";

mongoose.connect(dbURL);

module.exports = {mongoose};