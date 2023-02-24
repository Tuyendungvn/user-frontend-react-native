import {JobLevel, ProvinceType, JobType, CategoryLevel2} from '@apiCaller';
import {Recruitment} from '@apiCaller';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IInitialState {
  currentJob: Recruitment | null;
  saveJobSuccess: boolean;
  appliedJobSuccess: boolean;
  listProvinceSelected: ProvinceType[];
  listJobTypeSelected: JobType[];
  listJobLevelSelected: JobLevel[];
  listCareerSelected: CategoryLevel2[];
}

const initialState: IInitialState = {
  currentJob: null,
  saveJobSuccess: false,
  appliedJobSuccess: false,
  listProvinceSelected: [],
  listJobTypeSelected: [],
  listJobLevelSelected: [],
  listCareerSelected: [],
};

const jobSlices = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setJob: (state, actions: PayloadAction<Recruitment | null>) => {
      state.currentJob = actions.payload;
    },
    setListProvinceSelected: (
      state,
      actions: PayloadAction<ProvinceType[]>,
    ) => {
      state.listProvinceSelected = actions.payload;
    },
    setListJobTypeSelected: (state, actions: PayloadAction<JobType[]>) => {
      state.listJobTypeSelected = actions.payload;
    },
    setListJobLevelSelected: (state, actions: PayloadAction<JobLevel[]>) => {
      state.listJobLevelSelected = actions.payload;
    },
    setListCareerSelected: (state, action: PayloadAction<CategoryLevel2[]>) => {
      state.listCareerSelected = action.payload;
    },
    setSaveJobSuccess: (state, action: PayloadAction<boolean>) => {
      state.saveJobSuccess = action.payload;
    },
    setAppliedJobSuccess: (state, action: PayloadAction<boolean>) => {
      state.appliedJobSuccess = action.payload;
    },
  },
});

export const {
  setJob,
  setListProvinceSelected,
  setListJobLevelSelected,
  setListJobTypeSelected,
  setListCareerSelected,
  setSaveJobSuccess,
  setAppliedJobSuccess,
} = jobSlices.actions;
export default jobSlices.reducer;
