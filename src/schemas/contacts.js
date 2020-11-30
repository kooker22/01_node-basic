const mongoose = require("mongoose");
const { Schema } = mongoose;
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
  },
  subscription: {
    type: String,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
});
const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
