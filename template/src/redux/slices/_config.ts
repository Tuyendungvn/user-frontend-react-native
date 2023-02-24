import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISystemConfig {
  isExtendDrawer: boolean;
  isUpdateLocalStorage: boolean;
  loadingTasks: string[];
  isCollapse: boolean;
}

const initialState: ISystemConfig = {
  isExtendDrawer: true,
  isUpdateLocalStorage: false,

  loadingTasks: [],
  isCollapse: false,
};

export const _configSlice = createSlice({
  name: '_config',
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<string>) => {
      state.loadingTasks.push(action.payload);
    },
    stopLoading: (state, action: PayloadAction<string>) => {
      state.loadingTasks = state.loadingTasks.filter(
        task => task !== action.payload
      );
    },
    clearLoadingTasks: state => {
      state.loadingTasks = [];
    },
  },
});

// Actions
export const { startLoading, stopLoading, clearLoadingTasks } =
  _configSlice.actions;

export default _configSlice.reducer;
