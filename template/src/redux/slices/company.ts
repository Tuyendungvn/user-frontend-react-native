import {CategoryLevel2, ProvinceType} from '@apiCaller';
import {Company} from '@apiCaller';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IInitialState {
  currentCompany: Company | null;
  listProvinceSelected: ProvinceType[];
  listCareerSelected: CategoryLevel2[];
  recruitmentId: string | null;
}

const initialState: IInitialState = {
  currentCompany: null,
  listCareerSelected: [],
  listProvinceSelected: [],
  recruitmentId: null,
};

const companySlices = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setCurrentCompany: (state, actions: PayloadAction<Company | null>) => {
      state.currentCompany = actions.payload;
    },
    setListCareerSelected: (state, action: PayloadAction<CategoryLevel2[]>) => {
      state.listCareerSelected = action.payload;
    },
    setListProvinceSelected: (state, action: PayloadAction<ProvinceType[]>) => {
      state.listProvinceSelected = action.payload;
    },
    onNavigateId: (state, action: PayloadAction<string>) => {
      state.recruitmentId = action.payload;
    },
    onResetNavigate: state => {
      state.recruitmentId = null;
    },
  },
});

export const {
  setCurrentCompany,
  setListCareerSelected,
  setListProvinceSelected,
  onNavigateId,
  onResetNavigate,
} = companySlices.actions;
export default companySlices.reducer;
