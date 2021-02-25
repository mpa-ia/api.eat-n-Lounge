import express = require('express');
import * as bookings from '../controllers/bookings.controller';
import * as validation from '../middlewares/booking.validation';

const router = express.Router();

router.get('/list', bookings.getAll);
router.route('/new').post(validation.validateBookingFields, bookings.submitNew);

export default router;