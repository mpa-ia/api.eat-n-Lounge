import Booking from '../models/booking.model';
import mongoose = require('mongoose');
import { DBBooking, ServerRequest } from '../types';
import { errorCodes, successCodes } from '../settings/codes';
import moment from 'moment';
export const getAll: ServerRequest = async (_req, res) => {
  try {
    const now = moment().unix();
    const bookings = await Booking.find({ date: { '$gt': now } });
    if (!bookings) res.status(404).json({ error: true, errorCode: errorCodes.NO_RESOURCE });
    else {
      res.json({ status: 'success', data: bookings });
    }
  } catch (err) {
    res.status(500).json({ error: true, errorCode: errorCodes.UNKNOWN_ERROR });
  }
};

export const submitNew: ServerRequest = async (req, res) => {
  const { date, table, starters, hours, people, phone, surname, userId } = req.body as DBBooking;
  try {
    const newBooking = new Booking({
      date,
      table,
      starters,
      hours,
      people,
      surname,
      phone,
    });
    if (userId) {
      newBooking.userId = userId;
    }
    await newBooking.save();
    res.status(200).json({ status: 'success', code: successCodes.SUBMIT_BOOKING_SUCCESS });
  } catch (err) {
    res.status(500).json({ error: true, errorCode: errorCodes.UNKNOWN_ERROR });
  }
};

export const editBooking: ServerRequest = async (req, res) => {
  if (req.body) {
    try {
      const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
      if (!isValidId) res.status(404).json({ error: true, errorCode: errorCodes.NO_RESOURCE });
      else {
        const {
          date,
          table,
          starters,
          hours,
          people,
        } = req.body;
        const booking = await Booking.findOne({ _id: req.params.id });
        if (booking) {
          booking.date = date;
          booking.table = table;
          booking.starters = starters;
          booking.hours = hours;
          booking.people = people;
          await booking.save();
          res.status(200).json({ status: 'success', actionCode: successCodes.UPDATE_BOOKING_SUCCESS, data: booking });
        } else res.status(404).json({ error: true, errorCode: errorCodes.NO_RESOURCE });
      }
    } catch (err) {
      res.status(500).json({ error: true, errorCode: errorCodes.UNKNOWN_ERROR });
    }
  }
};
export const cancelBooking: ServerRequest = async (req, res) => {
  try {
    Booking.findByIdAndDelete(req.params.id, undefined, (err: Error, doc: DBBooking | null): void => {
      if (err || !doc) res.status(404).json({ error: true, errorCode: errorCodes.NO_RESOURCE });
      else {
        res.status(200).json({ status: 'success', actionCode: successCodes.DELETE_BOOKING_SUCCESS });
      }
    });
  } catch (err) {
    res.status(500).json({ error: true, errorCode: 9999 });
  }
};