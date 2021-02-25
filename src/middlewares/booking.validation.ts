import { errorCodes } from "settings/codes";
import { DBBooking, ValidateRequestParams } from "../types";

export const validateBookingFields: ValidateRequestParams = (req, res, next) => { 
	const { duration, date, table, starters, hours, people, phone, surname } = req.body as DBBooking;
	let isBookingValid = true;
	if (!duration || duration <= 0) {
		isBookingValid = false;
		res.status(400).json({ error: true, errorCode: errorCodes.VALIDATION_ERROR_BAD_DURATION })
	}
	if (isBookingValid) {
		next();
	}
};