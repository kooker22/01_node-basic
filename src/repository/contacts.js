const Contact = require("../schemas/contacts");

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }
  async listContacts(userId, { limit = 3, offset = 0 }) {
    const result = await this.model.paginate(
      { owner: userId },
      {
        limit,
        offset,
        populate: {
          path: "owner",
          select: "email",
        },
      }
    );
    return result;
  }
  async getById(userId, id) {
    const result = await this.model
      .findOne({ _id: id, owner: userId })
      .populate({
        path: "owner",
        select: " email ",
      });
    return result;
  }
  async addContact(userId, body) {
    const result = await this.model.create({ ...body, owner: userId });
    return result;
  }
  async updateContact(userId, id, body) {
    const result = await this.model.findByIdAndUpdate(
      {
        _id: id,
        owner: userId,
      },
      { ...body },
      { new: true }
    );
    return result;
  }
  async removeContact(userId, id) {
    const result = await this.model.findByIdAndRemove({
      _id: id,
      owner: userId,
    });
    return result;
  }
}

module.exports = ContactsRepository;
