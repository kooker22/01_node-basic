const { ContactsRepository } = require('../repository');

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    };
  }
  listContacts() {
    const data = this.repositories.contacts.listContacts();
    return data;
  }
  getById({ id }) {
    const data = this.repositories.contacts.getById(id);

    return data;
  }
  addContact(body) {
    const data = this.repositories.contacts.addContact(body);
    return data;
  }
  updateContact({ id }, body) {
    const data = this.repositories.contacts.updateContact(id, body);
    return data;
  }
  removeContact({ id }) {
    const data = this.repositories.contacts.removeContact(id);
    return data;
  }
}

module.exports = ContactsService;
