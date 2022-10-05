import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MapState, MapType } from '../../models/map';
import { rotatePipes as rotate } from '../../utils';

const initialState: MapState = {
  level: Number(localStorage.getItem('level')) || 1,
  map: null,
  rotations: [],
  passwords: []
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
      setMap: (state, action: PayloadAction<MapType>) => {
          state.map = action.payload;
      },
      setPassword: (state, action: PayloadAction<string>) => {
        state.passwords = [...state.passwords, action.payload];
    },
      rotatePipes: (state, action: PayloadAction<[number, number]>) => {
          const [positionX, positionY] = action.payload;
          const newMap = [...state.map!];
          newMap[positionX][positionY] = rotate(newMap[positionX][positionY]);
          state.map = newMap;
          state.rotations = [...state.rotations, [positionX, positionY]];
      },
      emptyRotations: (state) => {
          state.rotations = [];
      },
      setCurrentLevel: (state, action: PayloadAction<number>) => {
          state.level = action.payload;
          localStorage.setItem('level', state.level.toString());
      },
  },
});

export const { setMap, rotatePipes, emptyRotations, setCurrentLevel, setPassword } = mapSlice.actions;

export default mapSlice.reducer;