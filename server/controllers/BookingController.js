import { select, insert, remove } from '../helpers/sqlQueries';


export const createBooking = async (req, res) => {
  const row = await select('first_name, id, email, last_name', 'users', `id = '${req.userData.Id}'`);
  const rows = await select('trip_id, status, bus_licence_number, trip_date', 'trips', `trip_id = '${req.body.trip_id}'`);
  class Booking {
    constructor() {
      this.bus_licence_number = rows[0].bus_licence_number,
      this.trip_date = rows[0].trip_date,
      this.user_email = row[0].email,
      this.first_name = row[0].first_name,
      this.last_name = row[0].last_name,
      this.trip_id = rows[0].trip_id,
      this.user_id = row[0].id
    }
  }

  const newBooking = new Booking();

  const rows1 = await insert('bookings', 'user_id, trip_id', '$1, $2',
    [newBooking.user_id, newBooking.trip_id]);
  return res.status(201).json({
    status: 201,
    message: 'Your Booking is Successfull',
    data: {
      booking_id : rows1.booking_id,
      bus_licence_number: newBooking.bus_licence_number,
      trip_date: newBooking.trip_date,
      first_name: newBooking.first_name,
      last_name: newBooking.last_name,
      user_email: newBooking.user_email,
    }
  });

};

export const allBookings = async (req, res) => {
  return res.status(404).json({
    status: 404,
    message: 'Sorry, You do not have Bookings. Please Book a Trip and try again'
  })
};
export const deleteBooking = async (req, res) => {
  const rowRemove = await remove('bookings', 'booking_id', `${req.params.id}`) 

  return res.status(200).json({
    status: 200,
    message: 'Booking Deleted Successfully'
  })
};