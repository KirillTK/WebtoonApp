import { Router } from 'express';
import { webtoonService } from '../services';

const route = Router();

const getComicsList = async (req, res) => {
  const list = await webtoonService.getComicsListWithPreview();

  res.json(list);
};

const getFullComicsInfo = async (req, res) => {
  const { id } = req.params;

  const comicsData = await webtoonService.getComicsById(id);

  res.json(comicsData);
};

const getEpisode = async (req, res) => {
  const { idComics, idEpisode } = req.params;
  const episode = await webtoonService.getComicsEpisode(idComics, idEpisode);

  res.json({ ...episode });
};

route.get('/', getComicsList);
route.get('/full/:id', getFullComicsInfo);
route.get('/episode/:idComics/:idEpisode', getEpisode);

export {
  route as webtoonRoutes,
};
