import { select } from '../helpers/sqlQueries';

export default async (req, res, next) => {
  if(req.query.origin || req.query.destination){
    const rowsy = await select('*', 'trips', `origin='${req.query.origin}' OR destination='${req.query.destination}'`);
    return res.status(200).json({
      status: 200,
      data: rowsy,
    });
  };
  next();
};