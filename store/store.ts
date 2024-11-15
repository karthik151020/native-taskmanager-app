import { configureStore } from '@reduxjs/toolkit';
import taskreducer from './slice';

export const store = configureStore({
  reducer: {
    taskStore: taskreducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
