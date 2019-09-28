import { update, select, insert } from '../helpers/sqlQueries';

export const createTrip = async (req, res) => {
  class Trip {
    constructor() {
      this.seating_capacity = req.body.seating_capacity,
      this.bus_licence_number = req.body.bus_licence_number,
      this.available_seats = req.body.available_seats,
      this.origin = req.body.origin,
      this.destination = req.body.destination,
      this.fare = req.body.fare,
      this.trip_date = req.body.trip_date,
      this.status = 'active'
    }
  }

  const newTrip = new Trip();

  const rows2 = await insert('trips', 'seating_capacity, bus_licence_number, available_seats, origin, destination, fare, trip_date, status', '$1, $2, $3, $4, $5, $6, $7, $8',
    [newTrip.seating_capacity, newTrip.bus_licence_number, newTrip.available_seats, newTrip.origin, newTrip.destination, newTrip.fare, newTrip.trip_date, newTrip.status]);
  return res.status(201).json({
    status: 201,
    message: 'Trip Created Successfully',
  });

};





export const allTrips = async (req, res) => {
  const rows = await select('trip_id, seating_capacity, available_seats, bus_licence_number, origin, destination, trip_date, fare, status', 'trips', `trip_id > 0`);
  res.status(200).json({
    status: 200,
    data: rows,
  });
};
export const specificTrip = async (req, res) => {
  const rows = await select('trip_id, seating_capacity, available_seats, bus_licence_number, origin, destination, trip_date, status', 'trips', `trip_id='${req.params.trip_id}'`);
  res.status(200).json({
    status: 200,
    data: rows[0],
  });
};
export const adminCancelTrip = async (req, res) => {
  await update('trips', `status='${'cancelled'}'`, `trip_id='${req.params.trip_id}'`);
  res.status(200).json({
    status: 200,
    data: {
      message: 'Trip Cancelled Successfully',
    },
  });
};
