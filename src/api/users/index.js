const express = require("express");
const { controllerUsers } = require("../../controllers");
const usersRouters = express.Router();
const { validateCreateUser } = require("../../validation/users");
const guard = require("../../helpers/guard");
const upload= require('../../helpers/multer')

usersRouters.post("/registration", validateCreateUser, controllerUsers.reg);
usersRouters.post("/login", controllerUsers.login);
usersRouters.post("/logout", guard, controllerUsers.logout);
usersRouters.get("/current", guard, controllerUsers.currentUser);
usersRouters.patch("/avatars", guard,upload.single('avatar'), controllerUsers.updateUser);

module.exports = usersRouters;
