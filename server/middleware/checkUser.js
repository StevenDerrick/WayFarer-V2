import { select } from '../helpers/sqlQueries';

export default async (req, res, next) => {
  const rows = await select('email', 'users', `email='${req.body.email}'`);
  if (rows[0]) {
    return res.status(422).json({
      status: 422,
      error: 'Email already exists',
    });
  }
  next();
};