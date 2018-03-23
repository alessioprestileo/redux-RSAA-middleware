// @flow

import request from 'superagent';
import type { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import type {
  Action,
  RSAAAction,
  RSAAState,
  AsyncActionsCollection,
} from './types';
import { RSAA } from './actionTypes';
import getAsyncActions from './getAsyncActions';

// prettier-ignore
export const testableRSAAMiddleware = (requestAgent : any) =>
  (api: MiddlewareAPI<RSAAState, RSAAAction, Dispatch<Action>>) =>
    (next: Dispatch<Action>) => (action: Action) => {
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
        body = {},
        headers = {},
        method = 'GET',
        path = '',
        query = '',
      } = action.payload;

      dispatch(startedSendingAction);

      const baseRequest = requestAgent(method, path);
      switch (method) {
        case 'PATCH':
        case 'patch':
        case 'POST':
        case 'post':
        case 'PUT':
        case 'put':
          baseRequest.send(body);
          break;
        case 'DELETE':
        case 'delete':
          break;
        case 'GET':
        case 'get':
        default:
          baseRequest.query(query);
      }

      baseRequest.set(headers);
      baseRequest.end((err, res) => {
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
export const RSAAMiddleware : Middleware<RSAAState, RSAAAction, Dispatch<Action>> =
    testableRSAAMiddleware(request);
