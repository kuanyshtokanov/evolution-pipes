import { configureStore } from '@reduxjs/toolkit';

import mapSlice from './map/map.slice';
import socketSlice from './socket/socket.slice';

export const store = configureStore({
  reducer: {
      socket: socketSlice,
      map: mapSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;