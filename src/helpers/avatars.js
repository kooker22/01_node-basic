const fs = require("fs/promises");
const Avatar = require("avatar-builder");

require("dotenv").config();

const filenameFn = (email) => {
  const name = email.split("@")[0];
  return name;
};
const formatDetect = (string) => {
  const splitedString = string.split(".");
  console.log(splitedString);
  const splitedStringLength = splitedString.length;

  const format = splitedString[splitedStringLength - 1];
  return format;
};

const avatarGenerator = async (req, res, next) => {
  try {
    const randomColor = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
    const randomNum = Math.floor(Math.random() * 50);
    const avatar = Avatar.squareBuilder(
      128,
      randomNum,
      [randomColor, "#ffffff"],
      {
        cache: null,
      }
    );
    const filename = filenameFn(req.body.email);
    const buffer = await avatar.create("gabriel");
    const tepmStorage = "tmp";
    const imageDir = `${process.env.IMAGE_DIR}/${filename}.png`;
    
    await fs.writeFile(`${tepmStorage}/${filename}.png`, buffer);
    const avatarURL = `http://localhost:3000/${process.env.IMAGE_URL}/${filename}.png`;

    await avatarReplacer(`${tepmStorage}/${filename}.png`, imageDir, (err) => {
      console.log(err);
    });
    return avatarURL;
  } catch (error) {
    console.log(error);
  }
};
const avatarReplacer = async (oldURL, newURL) => {
  try {
    await fs.rename(oldURL, newURL);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { avatarGenerator, formatDetect, filenameFn ,avatarReplacer};
