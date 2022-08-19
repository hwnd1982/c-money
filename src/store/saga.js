import {all} from 'redux-saga/effects';
import {watchCurrencies} from './currencies/currenciesSaga';
import {watchToken} from './token/tokenSaga';

export default function* rootSaga() {
  yield all([
    watchToken(),
    watchCurrencies(),
  ]);
}
