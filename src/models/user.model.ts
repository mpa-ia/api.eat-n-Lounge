import mongoose = require('mongoose');
import { DBUser } from '../types';

const userSchema = new mongoose.Schema({
  surname: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: Number, required: true },
},
  { versionKey: false }
);

export default mongoose.model<DBUser>('User', userSchema);