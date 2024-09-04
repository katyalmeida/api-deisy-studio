import Sequelize, { Model } from 'sequelize';

class Services extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        specialty_id: Sequelize.INTEGER,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/services-file/${this.path}`;
          },
        },
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Specialty, {
      foreignKey: 'specialty_id',
      as: 'specialty',
    });
  }
}

export default Services;
