import {all, call, put, takeEvery} from 'redux-saga/effects';
import {GET_COMICS_LIST, startLoading, stopLoading, setComicsList} from '../actions';
import {Api} from '../services/api';

export function* GET_COMICS_LIST_SAGA() {
  try {

    yield put(startLoading());

    const {data: { list } } = yield call(Api.getComics);

    console.log(list, 'SAGA');

    yield put(setComicsList(list));

    yield put(stopLoading());
  } catch (e) {}
}

export function* comicsSaga() {
  yield all([takeEvery(GET_COMICS_LIST, GET_COMICS_LIST_SAGA)]);
}
