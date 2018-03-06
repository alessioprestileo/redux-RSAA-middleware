// @flow

export type RSAAState = Object;

export type RSAAAction = {
  type: string,
  payload: RSAAPayload, // eslint-disable-line no-use-before-define
};

export type RSAAPayload = {
  method?: string,
  path?: string,
  query?: string,
  error?: Object,
  errorTime?: string,
  response?: Object,
  failureAction?: RSAAAction,
  successAction?: RSAAAction,
  startedSendingAction?: RSAAAction,
  finishedSendingAction?: RSAAAction,
};

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
  failureAction: RSAAAction,
  successAction: RSAAAction,
  startedSendingAction: RSAAAction,
  finishedSendingAction: RSAAAction,
};

export type getAsyncActions = (payload: RSAAPayload) => AsyncActionsCollection;
