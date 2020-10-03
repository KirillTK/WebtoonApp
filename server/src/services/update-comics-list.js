/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { WebtoonParser } from 'webtoon-parser';
import { Comics } from '../models';
import { webtoonService } from './webtoon';

const parser = new WebtoonParser();

const saveItem = (item) => (error, itemFromBd) => {
  if (!itemFromBd) {
    const comics = new Comics(item);
    comics.save();
  }
};

export const updateComicsList = async () => {
  const list = await parser.getComicsList();

  for (const item of list) {
    const fullData = await webtoonService.getComicsFullInfo(item.link);

    try {
      await Comics.findOneAndUpdate({ name: item.name }, {
        link: item.link,
        image: item.image,
        name: item.name,
        author: item.author,
        episodes: fullData.episodes,
      }, { new: true }, saveItem({ ...item, ...fullData }));
    } catch (e) {
      console.log('Error while do job', e);
    }
  }
};
