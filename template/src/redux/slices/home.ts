import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface IInitialState {
  loadHomeScreen: boolean;
}

const initialState: IInitialState = {
  loadHomeScreen: false,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setLoadHomeScreen: state => {
      state.loadHomeScreen = true;
    },
    resetLoadHomeScreen: state => {
      state.loadHomeScreen = false;
    },
  },
});

export const { setLoadHomeScreen, resetLoadHomeScreen } = homeSlice.actions;
export default homeSlice.reducer;
