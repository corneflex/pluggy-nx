import { configureStore } from '@reduxjs/toolkit';
import { pluginsApi } from './plugins/services/plugin';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [pluginsApi.reducerPath]: pluginsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pluginsApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch