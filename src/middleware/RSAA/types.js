// @flow

import {
  RSAA,
  API_CALL_FAILURE,
  API_CALL_FINISHED_SENDING,
  API_CALL_STARTED_SENDING,
  API_CALL_SUCCESS,
  NOT_RSAA,
} from './actionTypes';

export type RSAAState = Object;

export type RSAAPayload = {
  method?: string,
  path?: string,
  body?: Object,
  headers?: Object,
  query?: string | Object,
  error?: Object,
  errorTime?: string,
  response?: Object,
  failureAction?: ApiCallFailureAction, // eslint-disable-line no-use-before-define
  finishedSendingAction?: ApiCallFinishedAction, // eslint-disable-line no-use-before-define
  startedSendingAction?: ApiCallStartedAction, // eslint-disable-line no-use-before-define
  successAction?: ApiCallSuccessAction, // eslint-disable-line no-use-before-define
};

export type RSAAAction = {|
  type: typeof RSAA,
  payload: RSAAPayload,
|};

export type NotRSAAAction = {|
  type: typeof NOT_RSAA,
  payload: RSAAPayload,
|};

export type ApiCallFailureAction = {|
  type: typeof API_CALL_FAILURE,
  payload: RSAAPayload,
|};

export type ApiCallFinishedAction = {|
  type: typeof API_CALL_FINISHED_SENDING,
  payload: RSAAPayload,
|};

export type ApiCallStartedAction = {|
  type: typeof API_CALL_STARTED_SENDING,
  payload: RSAAPayload,
|};

export type ApiCallSuccessAction = {|
  type: typeof API_CALL_SUCCESS,
  payload: RSAAPayload,
|};

export type Action =
  | RSAAAction
  | NotRSAAAction
  | ApiCallFailureAction
  | ApiCallFinishedAction
  | ApiCallStartedAction
  | ApiCallSuccessAction;

export type DispatchAPI<A> = (action: A) => A;

// eslint-disable-next-line no-undef
export type Dispatch<A: { type: $Subtype<string> }> = DispatchAPI<A>;

// eslint-disable-next-line no-unused-vars
export type MiddlewareAPI<S, A, D = Dispatch<A>> = {
  dispatch: D,
  getState(): S,
};

export type RSAAMiddleware<S, A, D = Dispatch<A>> = (
  api: MiddlewareAPI<S, A, D>
) => (next: D) => D;

export type AsyncActionsCollection = {
  failureAction: ApiCallFailureAction,
  finishedSendingAction: ApiCallFinishedAction,
  startedSendingAction: ApiCallStartedAction,
  successAction: ApiCallSuccessAction,
};

export type getAsyncActions = (payload: RSAAPayload) => AsyncActionsCollection;
