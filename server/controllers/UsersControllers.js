import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import { encrypter } from '../helpers/tokenHandler';
import { select, insert } from '../helpers/sqlQueries'

dotenv.config();

export const usersSignUp = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  class User {
    constructor() {
      this.first_name = req.body.first_name,
      this.last_name = req.body.last_name,
      this.email = req.body.email,
      this.password = hashedPassword
    }
  }

  const newUser = new User();

  const rows = await insert('users', 'first_name, last_name, email, password', '$1, $2, $3, $4',
    [newUser.first_name, newUser.last_name, newUser.email, newUser.password]);
  const token = encrypter(rows.email, rows.id, rows.is_admin);
  return res.status(201).json({
    status: 201,
    message: 'User created successfully',
    data: {
      token,
    },
  });
};
export const usersSignIn = async (req, res) => {
  const rows = await select('id, email, is_admin', 'users', `email='${req.body.email}'`);

  const token = encrypter(rows[0].email, rows[0].id, rows[0].is_admin);
  res.status(200).json({
    status: 200,
    message: 'User is successfully logged in',
    data: {
      token,
    },
  });
};