import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const encrypter = (email, Id, is_admin) => {
  const token = jwt.sign({
    email,
    Id,
    is_admin,
  },
  process.env.JWT_KEY,
);
  return token;
};

export const decrypter = (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  return decodedToken;
};