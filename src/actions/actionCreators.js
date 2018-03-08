// @flow

import type {
  ActionCreator,
  RSAAAction,
  RSAAPayload,
  SamplePropsAction,
  SamplePropsPayload,
} from '../types';
import { RSAA, SET_SAMPLEPROP } from './actionTypes';

export const setSampleProp: ActionCreator = (data: SamplePropsPayload): SamplePropsAction => ({
  type: SET_SAMPLEPROP,
  payload: data,
});

export const createRSAA: ActionCreator = (data: RSAAPayload): RSAAAction => ({
  type: RSAA,
  payload: data,
});
