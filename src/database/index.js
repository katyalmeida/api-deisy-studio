import { Sequelize } from 'sequelize';
import configDataBase from '../config/database.cjs';
import User from '../app/models/User.js';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.conection = new Sequelize(configDataBase);
    models.map((model) => model.init(this.conection));
  }
}

export default new Database();
