/* eslint-env jest */
/* eslint-disable import/no-extraneous-dependencies */

import getAsyncActions from './getAsyncActions';
import {
  API_CALL_FAILURE,
  API_CALL_STARTED_SENDING,
  API_CALL_FINISHED_SENDING,
  API_CALL_SUCCESS,
  RSAA,
} from './actionTypes';

describe('getAsyncActions', () => {
  it('returns correct defaults when arguments are not given', () => {
    expect(getAsyncActions({})).toEqual({
      failureAction: {
        type: API_CALL_FAILURE,
        payload: {
          failureMessage:
            'Failed to send "GET" request to "NO_PATH" with query "NO_QUERY"',
          error: {},
          errorTime: '',
        },
      },
      successAction: {
        type: API_CALL_SUCCESS,
        payload: {
          successMessage:
            'Successfully sent "GET" request to "NO_PATH" with query "NO_QUERY"',
          response: {},
        },
      },
      startedSendingAction: {
        type: API_CALL_STARTED_SENDING,
        payload: {
          startedSendingMessage:
            'Started sending "GET" request to "NO_PATH" with query "NO_QUERY"',
        },
      },
      finishedSendingAction: {
        type: API_CALL_FINISHED_SENDING,
        payload: {
          finishedSendingMessage:
            'Finished sending "GET" request to "NO_PATH" with query "NO_QUERY"',
        },
      },
    });
  });

  it('returns correctly when given arguments', () => {
    const action = {
      type: RSAA,
      payload: {
        method: 'GET',
        path: 'https://jsonplaceholder.typicode.com/users',
        startedSendingAction: {
          type: 'STARTED_FETCHING_USERS',
          payload: null,
        },
        finishedSendingAction: {
          type: 'FINISHED_FETCHING_USERS',
          payload: null,
        },
        successAction: {
          type: 'UPDATE_USERS_WITH_FETCHED',
          payload: {},
        },
        failureAction: {
          type: 'FAILED_FETCHING_USERS',
          payload: {},
        },
      },
    };
    expect(getAsyncActions(action.payload)).toEqual({
      successAction: {
        type: 'UPDATE_USERS_WITH_FETCHED',
        payload: {},
      },
      startedSendingAction: {
        type: 'STARTED_FETCHING_USERS',
        payload: null,
      },
      finishedSendingAction: {
        type: 'FINISHED_FETCHING_USERS',
        payload: null,
      },
      failureAction: {
        type: 'FAILED_FETCHING_USERS',
        payload: {},
      },
    });
  });
});
