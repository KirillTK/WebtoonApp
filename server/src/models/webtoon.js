import mongoose from 'mongoose';

const ComicsSchema = new mongoose.Schema({
  link: { type: String, unique: true, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  episodes: {
    type: [
      {
        episodeUrl: { type: String },
        date: { type: String },
        title: { type: String },
        likes: { type: String },
      },
    ],
    default: [],
  },
});

export const Comics = mongoose.model('comics', ComicsSchema);
