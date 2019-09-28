import pool from "../config/dbConfig";

const createTables = `
DROP TABLE IF EXISTS users, trips, bookings CASCADE;
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
    INSERT INTO trips(
      seating_capacity, bus_licence_number, origin, destination, fare, trip_date, available_seats, status
     )VALUES(30, 'RAD303E', 'Kivu', 'Nkubito', '5000', '2019-12-23', 30, 'active');
    INSERT INTO trips(
      seating_capacity, bus_licence_number, origin, destination, fare, trip_date, available_seats, status
     )VALUES(30, 'RAD303E', 'Kist', 'Mucyo', '5000', '2019-12-23', 30, 'active'); 
    INSERT INTO trips(
      seating_capacity, bus_licence_number, origin, destination, fare, trip_date, available_seats, status
     )VALUES(30, 'RAD303E', 'Hanze', 'Africa', '5000', '2019-12-23', 30, 'active');
    INSERT INTO users(
      email, first_name, last_name, password, is_admin
     )VALUES('steven@gmail.com', 'Steven', 'Ishimwe', '$2b$10$TwoyAYsis7KgA3HeXMREKOO9VdA616Ob1zUQ.dJ8rLRcMckNSn2cy', true);
    INSERT INTO users(
      email, first_name, last_name, password, is_admin
    )VALUES('user1@gmail.com', 'Steven', 'Ishimwe', '$2b$10$0dPTCUyGmBI48.6hETCf8u5V0u1eKBiNzmfqIYVtnl0vu6ptQNey2', false);
  
    INSERT INTO users(
      email, first_name, last_name, password, is_admin
    )VALUES('user2@gmail.com', 'Steven', 'Ishimwe', '$2b$10$vORejUCV6sH5abBwpsJT9.7n1l/efD6Hr595iTb8MGD3LXzIV3QAS', false);
  
    `;


const tableCreate = async () => {
  await pool.query(createTables).then(() => {
    console.log('Tables created Successfully ');
    pool.end();
  }).catch((err) => {
    process.exit(0);
  });
};

tableCreate();