import { select } from '../helpers/sqlQueries';

export default async (req, res, next) => {
const row = await select('booking_id, trip_id, user_id, created_on', 'bookings', `user_id = '${req.userData.Id}'`);
const row1 = await select('booking_id, trip_id, user_id, created_on', 'bookings', `user_id = '${req.userData.Id}' AND booking_id = '${req.params.id}'`);

if (row.length == 0) {
    return res.status(200).json({
    status: 200,
    message: 'You do not have bookings yet.'
    })
} else if (row1.length == 0) {
    return res.status(200).json({
    status: 200,
    message: 'You do not have booking with ID ' + `${req.params.id}` 
    })
}
  next();
};