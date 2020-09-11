import {STOP_LOADING, START_LOADING} from '../actions';

const defaultState = {
  isFetch: false,
};

export const uiReducer = (state = defaultState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {...state, isFetch: true};
    case STOP_LOADING:
      return {...state, isFetch: false};

    default:
      return state;
  }
};
