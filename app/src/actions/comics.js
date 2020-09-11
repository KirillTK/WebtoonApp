export const GET_COMICS_LIST = '@@COMICS/GET_COMICS_LIST';
export const SET_COMICS_LIST = '@@COMICS/SET_COMICS_LIST';

export const getComicsList = () => ({
  type: GET_COMICS_LIST,
});

export const setComicsList = comicsList => ({
  type: SET_COMICS_LIST,
  payload: comicsList,
})
