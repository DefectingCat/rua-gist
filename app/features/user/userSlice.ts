import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type UserInfo = {
  id: number;
  name: string | null;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
  twitterUsername: string | null;
  blog: string | null;
  followers: number;
  following: number;
};
export type UserState = {
  logined: boolean;
} & UserInfo;

const initialState: UserState = {
  logined: false,
  id: 0,
  name: '',
  email: '',
  bio: null,
  avatar: null,
  createdAt: '',
  updatedAt: '',
  twitterUsername: null,
  blog: null,
  followers: 0,
  following: 0,
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
