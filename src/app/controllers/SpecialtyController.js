import * as Yup from 'yup';
import Specialty from '../models/Specialty.js';
import User from '../models/User.js';

class SpecialtyController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
    });

    try {
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, description } = request.body;
    console.log(description);
    const { filename: path } = request.file;

    try {
      const specialtyExists = await Specialty.findOne({
        where: { name },
      });

      if (specialtyExists) {
        return response.status(400).json({ error: 'Specialty already exists' });
      }

      await Specialty.create({ name, description, path });

      return response.status(200).json({ name });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async index(request, response) {
    try {
      const specialty = await Specialty.findAll();

      return response.json(specialty);
    } catch (err) {
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
    });

    try {
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    try {
      const { admin: isAdmin } = await User.findByPk(request.userId);
      if (!isAdmin) {
        return response.status(401).json({ error: 'User is not admin' });
      }

      const { name, description } = request.body;

      const { id } = request.params;

      const specialty = await Specialty.findByPk(id);
      if (!specialty) {
        return response.status(404).json({ error: 'Specialty not found' });
      }

      let path;
      if (request.file) {
        path = request.file.filename;
      }

      await Specialty.update({ name, path, description }, { where: { id } });
      return response
        .status(200)
        .json({ message: 'Specialty updated successfully' });
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new SpecialtyController();
