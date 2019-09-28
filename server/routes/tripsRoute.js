import express from "express";
import { allTrips, createTrip, specificTrip, adminCancelTrip } from '../controllers/TripsController';
import checkAuth from "../middleware/checkAuth";
import checkAdmin from "../middleware/checkAdmin";
import checkTripCreate from '../middleware/checkTripCreate';
import checkTripSpec from '../middleware/checkTripSpec';
import checkTripCancel from '../middleware/checkTripCancel';
import checkTripAll from '../middleware/checkTripAll'

const router = express.Router();


router.post("/trips", [checkAuth, checkAdmin, checkTripCreate], createTrip);
router.get("/trips/:trip_id", [checkAuth, checkTripSpec], specificTrip);
router.patch("/trips/:trip_id/cancel", [checkAuth, checkAdmin, checkTripCancel], adminCancelTrip);
router.get("/trips", [checkAuth, checkTripAll], allTrips);


export default router;
