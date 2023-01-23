import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, setLogout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
