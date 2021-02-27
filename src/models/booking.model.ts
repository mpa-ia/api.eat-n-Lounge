import mongoose = require('mongoose');
import { DBBooking } from '../types';

const bookingSchema = new mongoose.Schema({
  surname: { type: String, required: true },
  date: { type: String, required: true },
  table: { type: String, required: true },
  starters: { type: Array },
  hour: { type: Number, required: true },
  duration: { type: Number, required: true },
  people: { type: Number, required: true },
  phone: { type: Array, required: true },
},
  { versionKey: false }
);

export default mongoose.model<DBBooking>('Booking', bookingSchema);