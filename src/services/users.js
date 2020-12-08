const { UsersRepository } = require("../repository");

class UsersService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }
  async create(body) {
    const data = await this.repositories.users.create(body);
    return data;
  }
  async findById(id) {
    const data = await this.repositories.users.findById(id);
    return data;
  }
  async findByEmail(email) {
    const data = await this.repositories.users.findByEmail(email);
    return data;
  }
  async currentUser(token) {
    const data = await this.repositories.users.findCurrentUser(token);
    console.log(data)

    return data;
  }
}

module.exports = UsersService;
