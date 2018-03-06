// @flow

import type {
  ActionCreator,
  RSAAAction,
  SamplePropsAction,
  SamplePropsPayload,
} from '../types';
import { RSAA, SET_SAMPLEPROP } from './actionTypes';

export const setSampleProp: ActionCreator = (data: SamplePropsPayload): SamplePropsAction => ({
  type: SET_SAMPLEPROP,
  payload: data,
});

export const createRSAA: ActionCreator = (data: Object): RSAAAction => ({
  type: RSAA,
  payload: data,
});
