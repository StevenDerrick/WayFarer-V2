import { select } from '../helpers/sqlQueries';
import { postTrip } from '../middleware/tripsValidator';

export default async (req, res, next) => {
    const rows = await select('destination, origin, status', 'trips', `destination = '${req.body.destination}' AND origin = '${req.body.origin}'`);
  if (rows.length !== 0){
    return res.status(404).json({
      status: 404,
      message: 'This Trip is Already Available',
    })
  }
  const { body } = req;
  const { error } = postTrip(body);
  if (error) {
    const status = 400;
    return res.status(status).json({
      status,
      error: error.details[0].message
    });
  } 
  next();
};