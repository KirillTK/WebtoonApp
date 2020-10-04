import { WebtoonParser } from 'webtoon-parser';
import { flatten, sort } from 'ramda';
import { previewService } from './preview.service';
import { Comics } from '../models';

const webtoonParser = new WebtoonParser();

class WebtoonService {
  getComicsList() {
    return Comics.find({}, '_id link image name author');
  }

  async getComicsListWithPreview() {
    const listDoc = await this.getComicsList();

    const list = listDoc.map((item) => item.toObject());

    return previewService.getImagePreviews(list, 'image');
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

    if (!episodeUrl) {
      return null;
    }

    const episode = await webtoonParser.getEpisodeByUrl(episodeUrl);

    const previewsInBlob = await previewService.getImagePreviews(episode.content);

    return { ...episode, content: previewsInBlob };
  }
}

export const webtoonService = new WebtoonService();
