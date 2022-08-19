import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from './token/tokenSlice';
import currenciesReducer from './currencies/currenciesSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const logger = () => (next) => (action) => {
  console.log(action);
  next(action);
};

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    currencies: currenciesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
