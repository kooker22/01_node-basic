const express = require("express");
const { controllerContacts } = require("../../controllers");
const contactsRouter = express.Router();
const guard = require("../../helpers/guard");
const {
  validateCreateContact,
  validateUpdateContact,
  validateIdContact,
} = require("../../validation/contacts");
contactsRouter
  .get("/", guard, controllerContacts.listContacts)
  .get("/:id", guard, validateIdContact, controllerContacts.getById)
  .post("/", guard, validateCreateContact, controllerContacts.addContact)
  .patch(
    "/:id",
    guard,
    validateIdContact,
    validateUpdateContact,
    controllerContacts.updateContact
  )
  .delete("/:id", guard, validateIdContact, controllerContacts.removeContact);

module.exports = contactsRouter;
