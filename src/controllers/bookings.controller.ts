import Booking from '../models/booking.model';
import mongoose = require('mongoose');
import { DBBooking, ServerRequest } from '../types';
import { errorCodes, successCodes } from '../settings/codes';

export const getAll: ServerRequest = async (_req, res) => {
  try {
    const bookings = await Booking.find();
    if (!bookings) res.status(404).json({ error: true, errorCode: errorCodes.NO_RESOURCE });
    else {
      // res.json({ status: 'success', data: bookings });
      res.json(bookings);
    }
  } catch (err) {
    res.status(500).json({ error: true, errorCode: errorCodes.UNKNOWN_ERROR });
  }
};

export const submitNew: ServerRequest = async (req, res) => {
  const { date, table, starters, hours, people, phone, surname } = req.body as DBBooking;
  try {
        const newBooking = new Booking({
          date,
          table,
          starters,
          hours,
          people,
          surname,
          phone
        });
        await newBooking.save();
        res.status(200).json({ status: 'success', code: successCodes.SUBMIT_BOOKING_SUCCESS });
    } catch (err) {
      res.status(500).json({ error: true, errorCode: errorCodes.UNKNOWN_ERROR });
    }
};
