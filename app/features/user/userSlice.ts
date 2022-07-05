import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  logined: boolean;
  name: string | null;
  email: string;
  bio: string | null;
  avatar: string | null;
}

const initialState: UserState = {
  logined: false,
  name: '',
  email: '',
  bio: '',
  avatar: '',
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    setLogined(state) {
      state.logined = true;
    },
    setUserInfo(state, action: PayloadAction<Omit<UserState, 'logined'>>) {
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setLogined, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
