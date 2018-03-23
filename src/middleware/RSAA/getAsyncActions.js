// @flow

import {
  API_CALL_FAILURE,
  API_CALL_STARTED_SENDING,
  API_CALL_FINISHED_SENDING,
  API_CALL_SUCCESS,
} from './actionTypes';
import type {
  getAsyncActions as getAsyncActionsType,
  AsyncActionsCollection,
  RSAAPayload,
} from './types';

const getAsyncMessages = (method: string = 'GET', path: string = '') => ({
  failureMessage: `Failed to send "${method}" request to "${
    path !== '' ? path : 'NO_PATH'
  }"`,
  successMessage: `Successfully sent "${method}" request to "${
    path !== '' ? path : 'NO_PATH'
  }"`,
  startedSendingMessage: `Started sending "${method}" request to "${
    path !== '' ? path : 'NO_PATH'
  }"`,
  finishedSendingMessage: `Finished sending "${method}" request to "${
    path !== '' ? path : 'NO_PATH'
  }"`,
});

const getAsyncActions: getAsyncActionsType = (payload: RSAAPayload): AsyncActionsCollection => {
  const { method, path } = payload;
  const defaultMessages = getAsyncMessages(method, path);

  return {
    failureAction: payload.failureAction || {
      type: API_CALL_FAILURE,
      payload: {
        failureMessage: defaultMessages.failureMessage,
        error: {},
        errorTime: '',
      },
    },
    successAction: payload.successAction || {
      type: API_CALL_SUCCESS,
      payload: {
        successMessage: defaultMessages.successMessage,
        response: {},
      },
    },
    startedSendingAction: payload.startedSendingAction || {
      type: API_CALL_STARTED_SENDING,
      payload: {
        startedSendingMessage: defaultMessages.startedSendingMessage,
      },
    },
    finishedSendingAction: payload.finishedSendingAction || {
      type: API_CALL_FINISHED_SENDING,
      payload: {
        finishedSendingMessage: defaultMessages.finishedSendingMessage,
      },
    },
  };
};

export default getAsyncActions;
