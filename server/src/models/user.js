import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  date: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', UserSchema);
