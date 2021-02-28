import express = require('express');
import cors = require('cors');
import path = require('path');

import mongoose = require('mongoose');
import BookingsRouter from './routes/bookings.routes';
import AuthRouter from './routes/auth.routes';

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* API ENDPOINTS */
app.use('/api/bookings', BookingsRouter);
app.use('/api/auth', AuthRouter);

app.use(express.static(path.join(__dirname + '/public')));

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

/* MONGOOSE */
process.env.NODE_ENV === "production" ?
  mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@${process.env.MONGODB_REMOTE_URI}`, { useNewUrlParser: true, useUnifiedTopology: true }) :
  mongoose.connect(`mongodb://localhost:27017/${process.env.MONGODB_LOCAL_URI}`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});

module.exports = server;
