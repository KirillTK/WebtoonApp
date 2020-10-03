import { WebtoonParser } from 'webtoon-parser';
import { flatten, sort } from 'ramda';
import { Comics } from '../models';

const webtoonParser = new WebtoonParser();

class WebtoonService {
  getComicsList() {
    return Comics.find({}, '_id link image name author');
  }

  getComicsById(_id) {
    return Comics.findOne({ _id });
  }

  comicsDateDiff(firstComics, secondComics) {
    return new Date(firstComics.date).getTime() - new Date(secondComics.date).getTime();
  }

  async getComicsFullInfo(url) {
    const comicsList = await webtoonParser.parseAllComicsEpisodes(url);

    const flattenList = flatten(comicsList);

    const fullInfo = await webtoonParser.getFullInfo({ link: url });
    const episodes = sort(this.comicsDateDiff, flattenList);

    return { ...fullInfo, episodes };
  }

  async getComicsEpisode(idComics, idEpisode) {
    const comics = await this.getComicsById(idComics);

    const { episodeUrl } = comics.episodes.find((episode) => episode.id === idEpisode) || {};

    return episodeUrl ? webtoonParser.getEpisodeByUrl(episodeUrl) : null;
  }
}

export const webtoonService = new WebtoonService();
