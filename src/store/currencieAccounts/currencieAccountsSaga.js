import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {API_URL} from '../../api/const';
import {currencieAccountsSlice} from './currencieAccountsSlice';

function* request() {
  try {
    const token = yield select((store) => store.token.token);

    if (!token) return;

    const response = yield axios(`${API_URL}/currencies`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });

    if (response.data.error) {
      return yield put(currencieAccountsSlice.actions.error(response.data.error));
    }

    yield put(currencieAccountsSlice.actions.success(response.data.payload));
  } catch (error) {
    yield put(currencieAccountsSlice.actions.error(error));
  }
}

function* buy() {
  try {
    const token = yield select(store => store.token.token);

    if (!token) return;

    const data = yield select(store => store['currencie-accounts'].buy);
    const response = yield axios(`${API_URL}/currency-buy`, {
      method: 'post',
      headers: {
        Authorization: `Basic ${token}`,
      },
      data,
    });

    if (response.data.error) {
      return yield put(currencieAccountsSlice.actions.error(response.data.error));
    }

    yield put(currencieAccountsSlice.actions.success(response.data.payload));
  } catch (error) {
    yield put(currencieAccountsSlice.actions.error(error));
  }
}


export function* watchCurrencieAccounts() {
  yield takeLatest(currencieAccountsSlice.actions.request.type, request);
  yield takeLatest(currencieAccountsSlice.actions.buy.type, buy);
}
