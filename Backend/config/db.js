const mongoose = require("mongoose");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connection = mongoose.connect(process.env.mongoURL);

module.exports = { connection };