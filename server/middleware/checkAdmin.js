import { select } from '../helpers/sqlQueries';
import { decrypter } from '../helpers/tokenHandler';

export default async (req, res, next) => {
  const decodedToken = decrypter(req.headers.authorization);
  
  const rows = await select('is_admin', 'users', `email='${decodedToken.email}'`);
   
  if (!rows[0].is_admin) {
    return res.status(403).json({
      status: 403,
      error: 'Forbidden: Only Admins can perform this operation',
    });
  }
  next();
};
  