import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  header: '',
  active: '',
  table: '',
  loading: false,
  error: '',
  isLoad: false,
};

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
      state.error = '';
    },
    success: (state, action) => {
      state.loading = false;
      state.isLoad = true;
      state.header = action.payload;
      state.table = [...action.payload
        .map((from, index, currencies) => [...currencies
          .map(to => ({rate: to === from ? 1 : 0, change: 0, gap: 0}))])];
    },
    error: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.header = '';
      state.table = '';
      state.active = '';
    },
    update: (state, action) => {
      const cell = state.table[
        state.header.indexOf(action.payload.from)
      ][
        state.header.indexOf(action.payload.to)
      ];

      if (cell.rate) {
        cell.gap = (action.payload.rate - cell.rate).toFixed(2);
        cell.change = cell.gap ? cell.gap > 0 ? 1 : -1 : 0;
      }
      cell.rate = action.payload.rate;
      state.active = {
        from: state.header.indexOf(action.payload.from),
        to: state.header.indexOf(action.payload.to)
      };
    },
  },
});

export default currenciesSlice.reducer;
