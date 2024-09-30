import Reservation from '../models/Reservation.js';

class ReservationController {
  async createReservation(request, response) {
    const { name, options_id, date, time, status, payment_type } = request.body;
    const reservation = await Reservation.create({
      name,
      options_id,
      date,
      time,
      status,
      payment_type,
    });

    return response.status(200).json(reservation);
  }
}

export default new ReservationController();
