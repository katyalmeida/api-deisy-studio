import * as Yup from 'yup';
import User from '../models/User.js';
import Services from '../models/Services.js';
import Specialty from '../models/Specialty.js';

class ServicesController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      specialty_id: Yup.number().required(),
    });

    try {
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (error) {
      return response.status(400).json({ error: error.errors });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId);
    if (!isAdmin) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    const { filename: path } = request.file;
    const { name, specialty_id } = request.body;

    try {
      const services = await Services.create({
        name,
        specialty_id,
        path,
      });
      return response.json(services);
    } catch (error) {
      return response.status(500).json({ error: 'Failed to create service' });
    }
  }

  async index(request, response) {
    try {
      const services = await Services.findAll({
        include: [
          {
            model: Specialty,
            as: 'specialty',
            attributes: ['id', 'name'],
          },
        ],
      });
      return response.json(services);
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'Failed to retrieve services' });
    }
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      specialty_id: Yup.number(),
    });

    try {
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(request.userId);
    if (!isAdmin) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = request.params;

    const services = await Services.findByPk(id);
    if (!services) {
      return response.status(404).json({ error: 'Service not found' });
    }

    let path = services.path;
    if (request.file) {
      path = request.file.filename;
    }

    const { name, specialty_id } = request.body;

    try {
      await Services.update(
        {
          name,
          specialty_id,
          path,
        },
        { where: { id } },
      );
      return response
        .status(200)
        .json({ message: 'Service updated successfully' });
    } catch (error) {
      return response.status(500).json({ error: 'Failed to update service' });
    }
  }
}

export default new ServicesController();
