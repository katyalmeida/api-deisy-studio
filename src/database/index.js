import { Sequelize } from 'sequelize';
import configDataBase from '../config/database.cjs';
import User from '../app/models/User.js';
import Services from '../app/models/Services.js';
import Reservation from '../app/models/Reservation.js';

import Specialty from '../app/models/Specialty.js';
import Options from '../app/models/Options.js';
import ReservationController from '../app/models/Reservation.js';

const models = [User, Specialty, Services, Options, Reservation];

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
