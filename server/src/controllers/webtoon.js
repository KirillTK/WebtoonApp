import { Router } from 'express';
import { WebtoonParser } from 'webtoon-parser';
import { Comics } from '../models';

const route = Router();
const parser = new WebtoonParser();

const getComicsList = async (req, res) => {
  const list = await Comics.find({});

  res.json({ list });
};

const getFullComicsInfo = async (req, res) => {
  const { link } = req.query;
  const fullInfo = await parser.getFullInfo({ link });
  res.json({ ...fullInfo });
};

const getEpisode = async (req, res) => {
  const { link, episodeNumber } = req.query;

  const episode = await parser.getEpisodeByUrl(link, episodeNumber);

  res.json({ ...episode });
};

route.get('/', getComicsList);
route.get('/full', getFullComicsInfo);
route.get('/episode', getEpisode);

export {
  route as webtoonRoutes,
};
