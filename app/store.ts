import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import usersReducer, { UserState } from './features/user/userSlice';

export let store: null | ReturnType<typeof configureStore<{
  users: UserState;
}>> = null

export const createStore = (
  preloadedState?: ConfigureStoreOptions['preloadedState']
) => {
  if (typeof window === 'undefined') {
    return configureStore({
      reducer: { users: usersReducer },
      preloadedState,
    });
  }

  if (!store) {
    store = configureStore({
      reducer: { users: usersReducer },
      preloadedState,
    });
  }

  return store;
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<ReturnType<typeof configureStore<{
  users: UserState;
}>>['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<ReturnType<typeof configureStore<{
  users: UserState;
}>>['dispatch']> ;
