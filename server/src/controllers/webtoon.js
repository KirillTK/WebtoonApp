import { Router } from 'express';
import { WebtoonParser } from 'webtoon-parser';

const route = Router();

const getComicsList = async (req, res) => {
  const parser = new WebtoonParser();

  const list = await parser.getComicsList();

  res.json({ list });
};

route.get('/comics', getComicsList);

export {
  route as webtoonRoutes,
};
