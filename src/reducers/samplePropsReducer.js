// @flow

import type { SamplePropsReducer } from '../types';
import initialState from '../initialState';
import { SET_SAMPLEPROP } from '../actions/actionTypes';

const samplePropsReducer: SamplePropsReducer = (
  state = initialState.sampleProps,
  action,
) => {
  const sampleProps = { ...state };

  switch (action.type) {
    case SET_SAMPLEPROP:
      return Object.assign(sampleProps, action.payload);
    default:
      return state;
  }
};

export default samplePropsReducer;
