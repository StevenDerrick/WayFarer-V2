import { trips } from "../models/trips";
import {
  postTrip,
  cancelValidation
} from "../helpers/validators/tripsValidator";

export default class TripsControl {
  static allTrips(req, res, next) {
      res.status(200).json({
        status: 200,
        data: trips
      });
  }
  static individualTrip(req, res, next) {
    const trip = trips.find(t => t.trip_id === parseInt(req.params.trip_id));
    if (!trip) {
      const status = 404;
      return res.status(status).json({
        status,
        error: "trip not found"
      });
    }
    const status = 200;

    res.status(200).json({
      status,
      data: trip
    });
  }

  static newTrip(req, res, next) {
    const { body } = req;
    const { error } = postTrip(body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, error: error.details[0].message });
    }

    const newTrip = {
      trip_id: trips.length + 1,
      seating_capacity: req.body.seating_capacity,
      bus_license_number: req.body.bus_license_number,
      origin: req.body.origin,
      destination: req.body.destination,
      trip_date: req.body.trip_date,
      fare: req.body.fare,
      status: "active"
    };
    trips.push(newTrip);
    res.status(201).json({ status: 201, data: newTrip });
  }

  static cancelTrip(req, res, next) {
    const { error } = cancelValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, error: error.details[0].message });
    }
    const trip = trips.find(c => c.trip_id === parseInt(req.params.trip_id));
    if (!trip) {
      return res.status(404).json({
        status: 404,
        error: "trip not found"
      });
    }
    if (trip.status === req.body.status) {
      if (req.body.status === "cancelled") {
        return res
          .status(400)
          .json({ status: 400, error: " trip already cancelled" });
      }
    }

    trip.status = req.body.status;
    res.status(200).json({ status: 200, data: "trip cancelled successful" });
  }
}
