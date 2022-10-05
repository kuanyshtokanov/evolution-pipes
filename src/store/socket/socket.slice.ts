import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SocketStatus } from '../../const';
import { SocketState } from '../../models/socket';

const initialState: SocketState = {
  status: SocketStatus.NOT_CONNECTED,
  busy: false,
};

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocketStatus: (state, action: PayloadAction<SocketStatus>) => {
            state.status = action.payload;
        },
        setSocketBusy: (state, action: PayloadAction<boolean>) => {
            state.busy = action.payload;
        },
    },
});

export const { setSocketStatus, setSocketBusy } = socketSlice.actions;

export default socketSlice.reducer;