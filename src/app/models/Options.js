import Sequelize, { Model } from 'sequelize';

class Options extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        service_id: Sequelize.INTEGER,
        price: Sequelize.FLOAT,
      },

      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Services, {
      foreignKey: 'service_id',
      as: 'services',
    });
  }
}

export default Options;
