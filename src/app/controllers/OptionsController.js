import Options from '../models/Options.js';
import Services from '../models/Services.js';

class OptionsController {
  async createOption(request, response) {
    const { name, price, service_id } = request.body;

    const serviceExists = await Services.findAll({
      where: { id: service_id },
    });

    if (!serviceExists) {
      return response.status(404).json({ error: 'Falha ao criar' });
    }
    const options = await Options.create({
      name,
      price,
      service_id,
    });

    return response.status(200).json(options);
  }

  async index(request, response) {
    const options = await Options.findAll({
      include: [
        {
          model: Services,
          as: 'services',
          attributes: ['id', 'name'],
        },
      ],
    });
    return response.status(200).json(options);
  }
}
export default new OptionsController();
