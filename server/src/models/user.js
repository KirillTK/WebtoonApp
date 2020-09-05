import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

UserSchema.plugin(passportLocalMongoose);

export const User = mongoose.model('user', UserSchema, 'user');
