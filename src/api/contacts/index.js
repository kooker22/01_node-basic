const express = require('express');
const controllerContacts = require('../../controllers/contacts');
const contactsRouter = express.Router();
const {
  validateCreateContact,
  validateUpdateContact,
  validateIdContact

} = require('../../validation/contacts');
contactsRouter
  .get('/', controllerContacts.listContacts)
  .get('/:id',validateIdContact, controllerContacts.getById)
  .post('/', validateCreateContact, controllerContacts.addContact)
  .patch('/:id',validateIdContact,validateUpdateContact, controllerContacts.updateContact)
  .delete('/:id',validateIdContact, controllerContacts.removeContact);

module.exports = contactsRouter;
