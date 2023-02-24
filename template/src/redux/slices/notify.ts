import {Notify} from '@apiCaller';

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IInitialState {
  currentNotify: Notify | null;
  recheckActive: boolean;
  isReloadNotify: boolean;
  isActiveNotify: boolean;
}

const initialState: IInitialState = {
  currentNotify: null,
  recheckActive: false,
  isReloadNotify: false,
  isActiveNotify: false,
};

const jobSlices = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    setCurrentNotify: (state, actions: PayloadAction<Notify | null>) => {
      state.currentNotify = actions.payload;
    },
    setActiveNotify: (state, actions: PayloadAction<boolean>) => {
      state.isActiveNotify = actions.payload;
    },
    setRecheckActive: (state, actions: PayloadAction) => {
      state.recheckActive = true;
    },
    resetRecheckActive: (state, actions: PayloadAction) => {
      state.recheckActive = false;
    },
    setReloadNotify: (state, actions: PayloadAction) => {
      state.isReloadNotify = true;
    },
    resetReloadNotify: (state, actions: PayloadAction) => {
      state.isReloadNotify = false;
    },
  },
});

export const {
  setCurrentNotify,
  setActiveNotify,
  resetRecheckActive,
  setRecheckActive,
  setReloadNotify,
  resetReloadNotify,
} = jobSlices.actions;
export default jobSlices.reducer;
