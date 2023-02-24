import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth';
import profile from './profile';
import common from './common';
import job from './job';
import company from './company';
import _config from './_config';
import notify from './notify';
import home from './home';
export const reducer = combineReducers({
  auth,
  profile,
  common,
  job,
  company,
  home,
  _config,
  notify,
});
