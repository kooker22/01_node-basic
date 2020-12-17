const { UsersRepository } = require("../repository");

class UsersService {
  constructor() {
    this.repositories = {
      user: new UsersRepository(),
    };
  }
  async create(body) {
    const data = await this.repositories.user.create(body);
    return data;
  }
  async findById(id) {
    const data = await this.repositories.user.findById(id);
    return data;
  }
  async findByEmail(email) {
    const data = await this.repositories.user.findByEmail(email);
    return data;
  }
  async currentUser(token) {
    const data = await this.repositories.user.findCurrentUser(token);

    return data;
  }
}

module.exports = UsersService;
