// @flow

import type { OthersReducer, Action } from '../types';
import initialState from '../initialState';
import { API_CALL_FAILURE } from '../actions/actionTypes';

const othersReducer: OthersReducer = (
  state = initialState.others,
  action: Action,
) => {
  switch (action.type) {
    case API_CALL_FAILURE:
      return { data: action.payload };
    default:
      return state;
  }
};

export default othersReducer;
