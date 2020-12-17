const { UsersService, AuthService } = require("../services");
const fs = require("fs/promises");
require("dotenv").config();
const { HttpCode } = require("../helpers/constants");
const jwtDecoder = require("jwt-decode");
const serviceUser = new UsersService();
const serviceAuth = new AuthService();
const {
  avatarGenerator,
  formatDetect,
  filenameFn,
  avatarReplacer,
} = require("../helpers/avatars");

const reg = async (req, res, next) => {
  const { email, password } = req.body;
  const avatarURL = await avatarGenerator(req, res, next);
  const user = await serviceUser.findByEmail(email);
  if (user) {
    return next({
      Status: HttpCode.CONFLICT,
      "Content-Type": "application / json",
      ResponseBody: {
        message: "Email in use",
      },
    });
  }
  try {
    await serviceUser.create({ email, password, avatarURL });
    return res.status(HttpCode.CREATED).json({
      Status: HttpCode.CREATED,
      "Content-Type": "application/json",
      ResponseBody: {
        user: {
          avatarURL: avatarURL,
          email: email,
          subscription: "free",
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await serviceAuth.login({ email, password });

    if (token) {
      return res.status(HttpCode.OK).json({
        status: HttpCode.OK,
        "Content-Type": "application/json",
        ResponseBody: {
          token: token,
          user: {
            email: email,
            subscription: "free",
          },
        },
      });
    }
    next({
      Status: HttpCode.UNAUTHORIZED,
      ResponseBody: "Email or password is wrong",
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await serviceAuth.logout(id);
  return res
    .status(HttpCode.NO_CONTENT)
    .json({ status: "success", code: HttpCode.NO_CONTENT });
};
const currentUser = async (req, res, next) => {
  try {
    const { token } = req.user;
    decodedToken = jwtDecoder(token);
    currentUserId = decodedToken.id;
    const { email, subscription } = await serviceUser.findById(currentUserId);
    return res.status(HttpCode.OK).json({
      Status: HttpCode.OK,
      "Content-Type": "application/json",
      ResponseBody: {
        email: email,
        subscription: subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const filename = filenameFn(req.user.email);
    const format = formatDetect(req.file.filename);
    const avatarPath = `${process.env.IMAGE_DIR}/${filename}.${format}`;
    const avatarURL = `http://localhost:3000/${process.env.IMAGE_URL}/${filename}.${format}`;
    await avatarReplacer(req.file.path, avatarPath);
    return res.status(HttpCode.OK).json({
      Status: HttpCode.OK,
      "Content-Type": "application/json",
      ResponseBody: {
        avatarURL: avatarURL,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  reg,
  login,
  logout,
  currentUser,
  updateUser,
};
