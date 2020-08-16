/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { WebtoonParser } from 'webtoon-parser';
import { Comics } from '../models';

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
    try {
      await Comics.findOneAndUpdate({ name: item.name }, {
        link: item.link,
        image: item.image,
        name: item.name,
        author: item.author,
      }, { new: true }, saveItem(item));
    } catch (e) {
      console.log('Error while do job', e);
    }
  }
};
