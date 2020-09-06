import {all, fork} from 'redux-saga/effects';
import {comicsSaga} from './comics';

export function* rootSaga() {
  try {
    yield all([fork(comicsSaga)]);
  } catch (e) {
    console.error(e);
  }
}
