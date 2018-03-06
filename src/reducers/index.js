// @flow

import { combineReducers } from 'redux';
import sampleProps from './samplePropsReducer';
import users from './usersReducer';
import others from './othersReducer';

const topReducer = combineReducers({
  sampleProps,
  users,
  others,
});

export default topReducer;
