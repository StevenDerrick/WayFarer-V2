import { select } from '../helpers/sqlQueries';

export default async (req, res, next) => {
  const rows = await select('booking_id, trip_id, user_id, created_on', 'bookings', `booking_id > 0`);
  const row = await select('booking_id, trip_id, user_id, created_on', 'bookings', `user_id = '${req.userData.Id}'`);
  if (req.userData.is_admin == true) {
    return res.status(200).json({
      status: 200,
      data: rows,
    });
  } 
  if (req.userData.Id = rows[0].user_id && row.length != 0) {
    return res.status(200).json({
      status: 200,
      data: row,
    })
  };
  next();
};