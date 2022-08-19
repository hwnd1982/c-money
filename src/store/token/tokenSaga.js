import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';
import {API_URL} from '../../api/const';
import {tokenSlice} from './tokenSlice';

function* getToken() {
  let token = yield localStorage.getItem('Basic') || '';

  if (token) {
    return yield put(tokenSlice.actions.success(token));
  }
  try {
    const response = yield axios(`${API_URL}/login`, {
      method: 'post',
      data: {
        login: 'developer',
        password: 'methed'
      }
    });

    if (response.data.error) {
      return yield put(tokenSlice.actions.error(response.data.error));
    }

    token = response.data.payload.token;
    yield localStorage.setItem('Basic', token);
    yield put(tokenSlice.actions.success(token));
  } catch (error) {
    yield put(tokenSlice.actions.error(error));
  }
}

function* deleteToken() {
  yield localStorage.removeItem('Basic');
}

export function* watchToken() {
  yield takeLatest(tokenSlice.actions.request.type, getToken);
  yield takeLatest(tokenSlice.actions.delete.type, deleteToken);
}

