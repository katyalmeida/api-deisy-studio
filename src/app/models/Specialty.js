import Sequelize, { Model } from 'sequelize';

class Specialty extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Services, {
      foreignKey: 'specialty_id',
      as: 'services',
    });
  }
}

export default Specialty;
