import express = require('express');
import * as bookings from '../controllers/bookings.controller';
import validation from '../middlewares/booking.validation';

const router = express.Router();

router.get('/list', bookings.getAll);
router.post('/new', validation.validateBookingFields, bookings.submitNew);
// router.delete('/cancel/:id', bookings.cancelBooking);
router.put('/edit/:id', bookings.editBooking);

export default router;