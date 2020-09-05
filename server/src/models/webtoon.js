import mongoose from 'mongoose';

const ComicsSchema = new mongoose.Schema({
  link: { type: String, unique: true, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
});

export const Comics = mongoose.model('comics', ComicsSchema);
