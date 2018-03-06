// @flow

import type { UsersReducer } from '../types';
import initialState from '../initialState';
import {
  STARTED_FETCHING_USERS,
  FINISHED_FETCHING_USERS,
  UPDATE_USERS_WITH_FETCHED,
} from '../actions/actionTypes';

const usersReducer: UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case STARTED_FETCHING_USERS:
      return { ...state, fetching: true };
    case FINISHED_FETCHING_USERS:
      return { ...state, fetching: false };
    case UPDATE_USERS_WITH_FETCHED:
      return Object.assign(
        {},
        { fetching: false, data: action.payload.response },
      );
    default:
      return state;
  }
};

export default usersReducer;
