import { select } from '../helpers/sqlQueries';
import { validatebooking } from '../middleware/bookingValidator';

export default async (req, res, next) => {
    const { body } = req;  
    const { error } = validatebooking(body);
    if (error) {
      const status = 400;
      return res.status(status).json({
        status,
        error: error.details[0].message
      });
    }
    const rows = await select('trip_id, status, bus_licence_number, trip_date', 'trips', `trip_id = '${req.body.trip_id}'`);
    
    if (!rows[0]){
      return res.status(404).json({
        status: 404,
        message: 'Trip with this ID does not exist',
      })
    }
    if (rows[0].status === 'cancelled'){
      return res.status(404).json({
        status: 404,
        message: 'This Trip is Cancelled. Try again Later.',
      })
    }
  next();
};