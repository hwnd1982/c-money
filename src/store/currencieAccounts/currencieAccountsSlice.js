import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  accounts: '',
  loading: false,
  error: '',
  isLoad: false,
  buy: {from: '', to: '', amount: ''},
};

export const currencieAccountsSlice = createSlice({
  name: 'currencie-accounts',
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
      state.error = '';
    },
    buy: (state, action) => {
      state.loading = true;
      state.error = '';
      state.buy = action.payload;
    },
    success: (state, action) => {
      state.loading = false;
      state.isLoad = true;
      state.accounts = action.payload;
      state.buy = {from: '', to: '', amount: ''};
    },
    error: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isLoad = !!state.accounts;
      state.buy = {from: '', to: '', amount: ''};
    },
  },
});

export default currencieAccountsSlice.reducer;
