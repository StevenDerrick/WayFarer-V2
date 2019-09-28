import bcrypt from 'bcrypt';
import pool from '../config/dbConfig';
import { insert } from '../helpers/sqlQueries';


console.log(process.env.NODE_ENV);


const createTables = `
DROP TABLE IF EXISTS users, trips, bookings;
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(30) UNIQUE NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    password VARCHAR(300) NOT NULL ,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
    );
CREATE TABLE IF NOT EXISTS trips (
    trip_id SERIAL PRIMARY KEY,
    seating_capacity INT NOT NULL,
    available_seats INT NOT NULL,
    bus_licence_number VARCHAR(10) NOT NULL,
    origin VARCHAR(20) NOT NULL,
    destination VARCHAR(20) NOT NULL,
    trip_date DATE NOT NULL,
    fare FLOAT(3) NOT NULL,
    status VARCHAR(20) NOT NULL
);
CREATE TABLE IF NOT EXISTS bookings (
    booking_id SERIAL PRIMARY KEY,
    trip_id INT references trips(trip_id) ON DELETE CASCADE,
    user_id INT references users(id) ON DELETE CASCADE,
    created_on TIMESTAMP NOT NULL DEFAULT NOW()
);
  `;

pool.query(createTables).then(() => {
  pool.end();
}).catch((err) => {
  console.log(err.message);
  process.exit(0);
});

const adminCreater = async () => {
  const hashedPassword = await bcrypt.hash('steven123', 10);
  await insert('users', 'email, first_name, last_name, password, is_admin', '$1, $2, $3, $4, $5', ['steven@gmail.com', 'Steven', 'Ishimwe', `${hashedPassword}`, true]);
};
console.log('Tables Created successfully');


adminCreater();