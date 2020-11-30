const mongoose = require("mongoose");
require("dotenv").config();
const uriDb = process.env.URI_DB;
const db = mongoose.connect(uriDb, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", (err) => {
  console.log("Mongoose connected");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error ${err.message}`);
});

mongoose.connection.on("disconnected", (err) => {
  console.log("Mongoose disconnected");
});

process.on("SIGNIT", () => {
  mongoose.connection.close(() => {
    console.log("connection for Data Base disconnected");
    process.exit(1);
  });
});

module.exports = db;
