import {GET_COMICS_LIST} from '../actions';

const defaultState = {
  list: [],
};

export const comicsReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case GET_COMICS_LIST:
      console.log(payload, 'reducer');
      return { ...state, list: payload };

      default: 
      return state;
  }
};
