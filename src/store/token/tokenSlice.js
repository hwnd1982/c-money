import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: '',
  loading: false,
  error: {},
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
      state.error = {};
    },
    success: (state, action) => {
      state.loading = false;
      state.token = action.payload;
    },
    error: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.token = '';
    },
    delete: (state) => {
      state.token = '';
      state.error = {};
      state.loading = false;
    },
  },
});

export default tokenSlice.reducer;
