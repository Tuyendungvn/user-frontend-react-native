import {User, JwtPayload} from '@apiCaller';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type IInputMode = 'INPUT_OTP' | 'INPUT_PHONE_NUMBER';
interface IInitialState {
  isDoneFirstTime: boolean;
  inputMode: IInputMode;
  userInfor: JwtPayload | null;
  reloadHomeScreen: boolean;
}

const initialState: IInitialState = {
  isDoneFirstTime: false,
  inputMode: 'INPUT_PHONE_NUMBER',
  userInfor: null,
  reloadHomeScreen: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsFirstTime: (state, actions: PayloadAction<boolean>) => {
      state.isDoneFirstTime = actions.payload;
    },
    setUser: (state, actions: PayloadAction<JwtPayload | null>) => {
      state.userInfor = actions.payload;
    },
    setInputMode: (state, actions: PayloadAction<IInputMode>) => {
      state.inputMode = actions.payload;
    },
    setReloadHomeScreen: (state, actions: PayloadAction) => {
      state.reloadHomeScreen = true;
    },
    resetReloadHomeScreen: (state, actions: PayloadAction) => {
      state.reloadHomeScreen = false;
    },
  },
});

export const {
  setIsFirstTime,
  setUser,
  setInputMode,
  setReloadHomeScreen,
  resetReloadHomeScreen,
} = authSlice.actions;
export default authSlice.reducer;
