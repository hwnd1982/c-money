import axios from 'axios';
import {put, select, takeLatest} from 'redux-saga/effects';
import {API_URL} from '../../api/const';
import {currenciesSlice} from './currenciesSlice';

function* request() {
  try {
    const token = yield select((store) => store.token.token);

    if (!token) return;

    const response = yield axios(`${API_URL}/all-currencies`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    });

    if (response.data.error) {
      return yield put(currenciesSlice.actions.error(response.data.error));
    }

    yield put(currenciesSlice.actions.success(response.data.payload));
  } catch (error) {
    yield put(currenciesSlice.actions.error(error));
  }
}

export function* watchCurrencies() {
  yield takeLatest(currenciesSlice.actions.request.type, request);
}
