import { Router } from 'express';
import { WebtoonParser } from 'webtoon-parser';
import { webtoonService } from '../services';

const route = Router();
const parser = new WebtoonParser();

const getComicsList = async (req, res) => {
  const list = await webtoonService.getComicsList();

  res.json({ list });
};

const getFullComicsInfo = async (req, res) => {
  const { id } = req.query;

  const comicsData = await webtoonService.getComicsById(id);

  res.json(comicsData);
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
