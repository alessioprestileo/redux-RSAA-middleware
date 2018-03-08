// @flow

import superagent from 'superagent';
import type { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import type { RSAAAction, RSAAState, AsyncActionsCollection } from './types';
import { RSAA } from './actionTypes';
import getAsyncActions from './getAsyncActions';

// prettier-ignore
export const testableRSAAMiddleware = (requestAgent : any) =>
  (api: MiddlewareAPI<RSAAState, RSAAAction, Dispatch<RSAAAction>>) =>
    (next: Dispatch<RSAAAction>) => (action: RSAAAction) => {
      if (action.type !== RSAA) {
        return next(action);
      }

      const {
        failureAction,
        successAction,
        startedSendingAction,
        finishedSendingAction,
      } : AsyncActionsCollection = getAsyncActions(action.payload);

      const { dispatch } = api;

      const {
        method = 'GET',
        path = '',
        query = '',
      } = action.payload;

      dispatch(startedSendingAction);

      requestAgent(method, path)
        .query(query)
        .end((err, res) => {
          if (err) {
            failureAction.payload.error = err;
            const date = new Date(Date.now());
            failureAction.payload.errorTime = date.toISOString();
            dispatch(failureAction);
            dispatch(finishedSendingAction);
          } else {
            successAction.payload.response = res.body;
            dispatch(successAction);
            dispatch(finishedSendingAction);
          }
        });
      return next(action);
    };

// prettier-ignore
export const RSAAMiddleware : Middleware<RSAAState, RSAAAction, Dispatch<RSAAAction>> =
    testableRSAAMiddleware(superagent);
