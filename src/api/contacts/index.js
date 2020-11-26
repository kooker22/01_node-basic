const express = require('express');
const controllerContacts = require('../../controllers/contacts');
const contactsRouter = express.Router();
contactsRouter
  .get('/', controllerContacts.listContacts)
  .get('/:id', controllerContacts.getById)
  .post('/', controllerContacts.addContact)
  .patch('/:id', controllerContacts.updateContact)
  .delete('/:id', controllerContacts.removeContact);

module.exports = contactsRouter;
