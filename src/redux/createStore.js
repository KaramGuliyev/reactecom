import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer';
import {persistStore} from 'redux-persist'

import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const middlewares = [thunk, logger, sagaMiddleware]; 

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default {
    store,
    persistor
};