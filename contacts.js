const fs = require('fs').promises;
const path = require('path');
const { number } = require('yargs');
const contactsPath = path.resolve(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: 'utf-8' });
    const parsedData = await JSON.parse(data);
    console.table(parsedData);
  } catch (error) {
    console.error(error);
  }
}
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, { encoding: 'utf-8' });
    const parsedData = await JSON.parse(data);
    const findedContact = await parsedData.find(
      (contact) => contact.id === contactId
    );
    console.table(findedContact);

    return findedContact;
  } catch (error) {
    console.log('error', error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, { encoding: 'utf-8' });
    const parsedData = await JSON.parse(data);
    const filteredList = await parsedData.filter(
      (contact) => contact.id !== contactId
    );
    const FilteredListAsJSON = JSON.stringify(filteredList);
    console.table(filteredList);
    await fs.writeFile(contactsPath, FilteredListAsJSON, 'utf-8');
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, { encoding: 'utf-8' });
    const parsedData = await JSON.parse(data);
    const lastElement = await parsedData.pop();
    await parsedData.push(lastElement);
    const id = (await lastElement.id) + 1;

    const newContact = {
      id: id,
      name,
      email,
      phone,
    };

    await parsedData.push(newContact);
    await parsedData.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
    const newContactListAsJSON = JSON.stringify(parsedData);
    await fs.writeFile(contactsPath, newContactListAsJSON);
    console.table('Contact has been added!');
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
