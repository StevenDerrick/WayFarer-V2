import { Joi } from "celebrate";
export const validatebooking = booking => {
  const schema = {
    trip_id: Joi.number().required() .error(() => {
      return {
        message: ' Trip ID is required.',
      };
    }),
  };
  return Joi.validate(booking, schema);
};