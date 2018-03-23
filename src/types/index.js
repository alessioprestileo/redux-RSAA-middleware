// @flow

import type { RSAAPayload as RSAAPayloadImport } from '../middleware/RSAA/types';
import {
  API_CALL_FAILURE,
  RSAA,
  SET_SAMPLEPROP,
  UPDATE_USERS_WITH_FETCHED,
  EDIT_USER,
} from '../actions/actionTypes';

export type UsersAction = {|
  type: typeof UPDATE_USERS_WITH_FETCHED | typeof EDIT_USER,
  payload: Object,
|};

export type SamplePropsPayload = {|
  sampleProp1?: string,
  sampleProp2?: string,
|};

export type SamplePropsAction = {|
  type: typeof SET_SAMPLEPROP,
  payload: SamplePropsPayload,
|};

export type RSAAPayload = RSAAPayloadImport;

export type RSAAAction = {|
  type: typeof RSAA,
  payload: RSAAPayloadImport,
|};

export type RSAAFailureAction = {|
  type: typeof API_CALL_FAILURE,
  payload: RSAAPayloadImport,
|};

export type Action =
  | RSAAAction
  | RSAAFailureAction
  | UsersAction
  | SamplePropsAction;

export type ActionCreator = Object => Action;

type SamplePropsState = {|
  +sampleProp1: string,
  +sampleProp2: string,
|};

type UsersState = {|
  +data: Array<any>,
  +fetching: boolean,
|};

type OthersState = {};

export type State = {|
  +sampleProps: SamplePropsState,
  +users: UsersState,
  +others: OthersState,
|};

export type Reducer<S, A> = (S, A) => S;

export type TopReducer = Reducer<State, Action>;

export type OthersReducer = Reducer<OthersState, Action>;

export type SamplePropsReducer = Reducer<SamplePropsState, SamplePropsAction>;

export type UsersReducer = Reducer<UsersState, UsersAction>;
