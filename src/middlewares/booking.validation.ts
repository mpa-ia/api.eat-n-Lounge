import { errorCodes } from "../settings/codes";
import { DBBooking, ValidateRequestParams } from "../types";

class BookingValidation {
	// private tables = ['table_1', 'table_2', 'table_3', 'table_4'];
	// private invalidSigns = /[-[\]{}()*+?.,\\^$|#\s]/g;
	// private validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	
	public validateBookingFields: ValidateRequestParams = (req, res, next) => { 
	const { /* date,  */table/* , hours, people, phone, surname  */} = req.body as DBBooking;
	let isBookingValid = true;
	if (!table) {
		isBookingValid = false;
		res.status(400).json({ error: true, errorCode: errorCodes.VALIDATION_ERROR_NO_TABLE_SELECTED })
	}
	if (isBookingValid) {
		next();
	}
	};
}


export default new BookingValidation;