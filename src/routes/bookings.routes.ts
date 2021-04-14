import express = require('express');
import * as bookings from '../controllers/bookings.controller';
import validation from '../middlewares/booking.validation';
import { authorizeUser } from '../middlewares/auth.validation';
const router = express.Router();

router.get('/list', bookings.getAll);
router.post('/new', validation.validateBookingFields, bookings.submitNew);
router.delete('/cancel/:id', authorizeUser, bookings.cancelBooking);
router.put('/edit/:id', authorizeUser, bookings.editBooking);

export default router;