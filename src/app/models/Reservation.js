import Sequelize, { Model } from 'sequelize';

class Reservation extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        options_id: Sequelize.INTEGER,
        date: Sequelize.DATE,
        time: Sequelize.TIME,
        status: Sequelize.ENUM('PENDING', 'CONFIRMED', 'CANCELLED'),
        payment_type: Sequelize.STRING,
      },

      {
        sequelize,
      },
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.Options, {
      foreignKey: 'options_id',
      as: 'options',
    });
  }
}

export default Reservation;
