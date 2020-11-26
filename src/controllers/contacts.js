const { HttpCode } = require('../helpers/constants');
const { ContactsService } = require('../services');
const contactsService = new ContactsService();

const listContacts = (req, res, next) => {
  try {
    const contacts = contactsService.listContacts();
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
};
const getById = (req, res, next) => {
  try {
    const contact = contactsService.getById(req.params);

    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const addContact = (req, res, next) => {
  try {
    const contact = contactsService.addContact(req.body);
    if (
      req.body.name === undefined ||
      req.body.email === undefined ||
      req.body.phone === undefined
    ) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'missing required name field',
      });
    } else {
      res.status(HttpCode.CREATED).json({
        status: 'success',
        code: HttpCode.CREATED,
        data: {
          contact,
        },
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateContact = (req, res, next) => {
  try {
    const contact = contactsService.updateContact(req.params, req.body);
    console.log(req.body.name);
    if (
      req.body.name === undefined ||
      req.body.email === undefined ||
      req.body.phone === undefined
    ) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'missing fields',
      });
    } else if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const removeContact = (req, res, next) => {
  try {
    const contact = contactsService.removeContact(req.params);
    console.log(contact);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: `contact ${contact.id} deleted`,
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
};
