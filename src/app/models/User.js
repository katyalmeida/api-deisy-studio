import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
        cpf: Sequelize.STRING,
        cpf_hash: Sequelize.VIRTUAL,
        date_of_birth: Sequelize.DATEONLY,
        phone_number: Sequelize.STRING,
      },

      { sequelize },
    );
    this.addHook('beforeSave', async (user) => {
      if (user) {
        user.cpf = await bcrypt.hash(user.cpf_hash, 2);
        user.password_hash = await bcrypt.hash(user.password, 10);
      }
    });
    return this;
  }
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
  checkCpf(cpf_hash) {
    return bcrypt.compare(cpf_hash, this.cpf);
  }
}

export default User;
