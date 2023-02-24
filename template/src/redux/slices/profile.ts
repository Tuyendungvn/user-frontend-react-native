import {User, Record} from '@apiCaller';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
interface IInitialState {
  currentUser: User | null;
  record: Record | null;
  recruitmentId: string | null;
  reloadProfile: boolean;
}

const initialState: IInitialState = {
  currentUser: null,
  record: null,
  recruitmentId: null,
  reloadProfile: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<User | null>) => {
      state.currentUser = actions.payload;
    },
    setRecord: (state, actions: PayloadAction<Record | null>) => {
      state.record = actions.payload;
    },
    onNavigateId: (state, action: PayloadAction<string>) => {
      state.recruitmentId = action.payload;
    },
    onResetNavigate: state => {
      state.recruitmentId = null;
    },
    setReloadProfile: (state, action: PayloadAction) => {
      state.reloadProfile = true;
    },
    resetReloadProfile: (state, action: PayloadAction) => {
      state.reloadProfile = false;
    },
  },
});

export const {
  setUser,
  setRecord,
  onNavigateId,
  onResetNavigate,
  setReloadProfile,
  resetReloadProfile,
} = profileSlice.actions;
export default profileSlice.reducer;
