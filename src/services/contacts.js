const { ContactsRepository } = require('../repository');

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    };
  }
  listContacts(userId,query) {
    const data = this.repositories.contacts.listContacts(userId,query);
    return data;
  }
  getById(userId, {id }) {
    const data = this.repositories.contacts.getById(userId,id);

    return data;
  }
  addContact(userId,body) {
    const data = this.repositories.contacts.addContact(userId,body);
    return data;
  }
  updateContact({ id }, userId,body) {
    const data = this.repositories.contacts.updateContact(id,userId, body);
    return data;
  }
  removeContact(userId,{ id} ) {
    const data = this.repositories.contacts.removeContact(id,userId);
    return data;
  }
}

module.exports = ContactsService;
