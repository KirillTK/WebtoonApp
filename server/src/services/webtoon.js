import { WebtoonParser } from 'webtoon-parser';
import { flatten, sort } from 'ramda';
import { Comics } from '../models';

const webtoonParser = new WebtoonParser();

class WebtoonService {
  getComicsList() {
    return Comics.find({});
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
}

export const webtoonService = new WebtoonService();
