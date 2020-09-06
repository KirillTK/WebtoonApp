import {combineReducers} from 'redux';
import {comicsReducer as comics} from './comicsReducer';
import { uiReducer as ui } from './uiReducer';

export const rootReducer = combineReducers({
  comics,
  ui,
});
