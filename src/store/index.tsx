import { createSlice, configureStore } from "@reduxjs/toolkit";
import { subscribe, unsubscribe } from "../websocket";

const initialState = {
  data: ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  isConnected: true,
  chanId: -1
};

const tickerSlice = createSlice({
  name: "ticker",
  initialState,
  reducers: {
    connect(state) {
      subscribe();
      state.isConnected = true;
    },
    disconnect(state) {
      unsubscribe(state.chanId);
      state.chanId = -1;
      state.isConnected = false;
      state.data = initialState.data;
    },
    update(state, action) {
      state.chanId = action.payload[0];
      state.data = action.payload[1];
    }
  }
});

const store = configureStore({
  reducer: tickerSlice.reducer
});

export const tickerActions = tickerSlice.actions;

export default store;
