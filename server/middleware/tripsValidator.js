import { Joi } from "celebrate";
export const postTrip = trip => {
  const schema = {
    seating_capacity: Joi.number()
      .required()
      .min(5)
      .max(100)
      .error(() => {
        return {
          message: ' Seating capacity is required and must be a number with min 5 and max 100.',
        };
      }),
    bus_licence_number: Joi.string()
      .min(2)
      .required()
      .error(() => {
        return {
          message: ' Bus Licence number is required and min is 9 characters.',
        };
      }),
    origin: Joi.string()
      .required()
      .min(4)
      .max(50)
      .error(() => {
        return {
          message: ' Origin is required with min 4 and max 50.',
        };
      }),
    destination: Joi.string()
      .required()
      .min(4)
      .max(50)
      .error(() => {
        return {
          message: ' Destination is required.',
        };
      }),
    fare: Joi.number()
      .required()
      .min(1)
      .max(500000)
      .error(() => {
        return {
          message: ' fare is required.',
        };
      }),
    trip_date: Joi.date()
      .min("now")
      .iso()
      .required()
      .error(() => {
        return {
          message: ' Trip date is required.',
        };
      }),
      available_seats: Joi.number()
      .required()
      .min(1)
      .max(44)
      .error(() => {
        return {
          message: ' Available seats is required.',
        };
      }),
  };
  return Joi.validate(trip, schema);
};
