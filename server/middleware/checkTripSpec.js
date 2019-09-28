import { select } from '../helpers/sqlQueries';

export default async (req, res, next) => {
    const row1 = await select('trip_id, seating_capacity, available_seats, bus_licence_number, origin, destination, trip_date, status', 'trips', `trip_id='${req.params.trip_id}'`);
  
    if (!row1[0]){
      return res.status(404).json({
        status: 404,
        message: 'The Trip with ID ' + `${req.params.trip_id}` + ' does not exist',
      })
    }
  next();
};