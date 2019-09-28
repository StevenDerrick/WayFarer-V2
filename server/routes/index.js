import express from 'express';
import user from './usersRoute';
import trip from './tripsRoute';
import booking from './bookingRoute';

const app = express();

app.use('/api/v1/', user);
app.use('/api/v1/', trip);
app.use('/api/v1/', booking);
app.use((req, res) => res.status(400).json({
  status: 400,
  data: 'No such endpoint',
}));


export default app;