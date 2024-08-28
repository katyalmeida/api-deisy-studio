import User from '../models/User.js';
import { v4 } from 'uuid';
import * as Yup from 'yup';

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      date_of_birth: Yup.date().required(),
      cpf_hash: Yup.string().required().length(11),
      phone_number: Yup.string().required(),
      admin: Yup.boolean(),
    });

    try {
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({ error: error.errors });
    }
    const {
      name,
      email,
      password,
      date_of_birth,
      cpf_hash,
      phone_number,
      admin,
    } = request.body;

    const userExists = await User.findOne({
      where: { email },
    });
    if (userExists) {
      return response.status(409).json({ error: 'User already exists' });
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      date_of_birth,
      cpf_hash,
      phone_number,
      admin,
    });
    return response.status(201).json({
      id: user.id,
      name,
      email,
      admin,
      date_of_birth,
      cpf_hash,
      phone_number,
    });
  }
  async index(response) {
    const user = await User.findAll();
    return response.json(user);
  }
  async update(request, response) {
    try {
      const { id } = request.params;
      const { name, email, date_of_birth, phone_number } = request.body;
      const user = await User.findByPk(id);
      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }
      await user.update({
        name,
        email,
        date_of_birth,
        phone_number,
      });

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const user = await User.findByPk(id);
      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }
      await user.destroy();
      return response
        .status(200)
        .json({ message: 'User deleted successfully' });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
