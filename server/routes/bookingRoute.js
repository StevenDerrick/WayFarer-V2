import express from "express";
import { createBooking, allBookings, deleteBooking } from "../controllers/BookingController";
import checkAuth from "../middleware/checkAuth";
import checkBookingAll from '../middleware/checkBookingAll';
import checkBookDelete from '../middleware/checkBookDelete';
import checkBookCreate  from '../middleware/checkBookingCreate';

const router = express.Router();

router.get("/booking", [checkAuth, checkBookingAll], allBookings);
router.post("/booking", [checkAuth, checkBookCreate], createBooking);
router.delete("/booking/:id", [checkAuth, checkBookDelete], deleteBooking);


export default router;
