const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_FACTOR = 10;
const { Schema } = mongoose;
const usersSchema = new Schema({
  avatarURL: String,
  email: String,
  password: String,
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: String,
});

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(
    this.password,
    bcrypt.genSaltSync(SALT_FACTOR)
  );
  next();
});

usersSchema.methods.validPassword = async function (password) {
  const a =  await bcrypt.compare(password, this.password);
  console.log(a)
  return a
};
const User = mongoose.model("user", usersSchema);
module.exports = User;
