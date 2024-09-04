import { Sequelize } from 'sequelize';
import configDataBase from '../config/database.cjs';
import User from '../app/models/User.js';
import Services from '../app/models/Services.js';

import Specialty from '../app/models/Specialty.js';

const models = [User, Specialty, Services];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.conection = new Sequelize(configDataBase);
    models.map((model) => model.init(this.conection));
  }
  init() {
    this.connection = new Sequelize(configDataBase);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      );
  }
}

export default new Database();
