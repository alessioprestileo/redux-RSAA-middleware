// @flow

import { combineReducers } from 'redux';
import type { CombinedReducer } from 'redux';
import type { Action } from '../types/';
import sampleProps from './samplePropsReducer';
import users from './usersReducer';
import others from './othersReducer';

const topReducer: CombinedReducer<any, Action> = combineReducers({
  sampleProps,
  users,
  others,
});

export default topReducer;
