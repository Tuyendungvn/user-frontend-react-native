import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface IInitialState {
  actionSuccess: boolean;
}

const initialState: IInitialState = {
  actionSuccess: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setActionSuccess: state => {
      state.actionSuccess = true;
    },
    setResetAction: state => {
      state.actionSuccess = false;
    },
  },
});

export const { setActionSuccess, setResetAction } = commonSlice.actions;
export default commonSlice.reducer;
