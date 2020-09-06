import {createStore, applyMiddleware, compose} from 'redux';
import {composeWithDevTools} from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from '../sagas';
import {rootReducer} from '../reducers';

const composeEnhancers = composeWithDevTools({
  realtime: true,
  name: 'Webtoon',
  hostname: 'localhost',
  port: 8081,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
