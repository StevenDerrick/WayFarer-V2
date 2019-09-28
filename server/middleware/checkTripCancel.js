import { select } from '../helpers/sqlQueries';

export default async (req, res, next) => {
const row = await select('status', 'trips', `trip_id = '${req.params.trip_id}'`);
if (!row[0]){
    return res.status(404).json({
    status: 404,
    message: 'The Trip with ID ' + `${req.params.trip_id}` + ' does not exist',
    })
}
if (row[0].status === 'cancelled'){
    return res.status(404).json({
    status: 404,
    message: 'This Trip is Already Cancelled',
    })
}
  next();
};