"use strict";

var _getAsyncActions = require("./getAsyncActions");

var _getAsyncActions2 = _interopRequireDefault(_getAsyncActions);

var _actionTypes = require("./actionTypes");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/* eslint-env jest */
/* eslint-disable import/no-extraneous-dependencies */

describe("getAsyncActions", function() {
  it("returns defaults when arguments are not given", function() {
    expect((0, _getAsyncActions2.default)({})).toEqual({
      failureAction: {
        type: _actionTypes.API_CALL_FAILURE,
        payload: {
          failureMessage:
            'Failed to send "GET" request to "NO_PATH" with query "NO_QUERY"',
          error: {},
          errorTime: ""
        }
      },
      successAction: {
        type: _actionTypes.API_CALL_SUCCESS,
        payload: {
          successMessage:
            'Successfully sent "GET" request to "NO_PATH" with query "NO_QUERY"',
          response: {}
        }
      },
      startedSendingAction: {
        type: _actionTypes.API_CALL_STARTED_SENDING,
        payload: {
          startedSendingMessage:
            'Started sending "GET" request to "NO_PATH" with query "NO_QUERY"'
        }
      },
      finishedSendingAction: {
        type: _actionTypes.API_CALL_FINISHED_SENDING,
        payload: {
          finishedSendingMessage:
            'Finished sending "GET" request to "NO_PATH" with query "NO_QUERY"'
        }
      }
    });
  });

  it("returns correct output when given arguments", function() {
    var action = {
      type: _actionTypes.RSAA,
      payload: {
        method: "GET",
        path: "https://jsonplaceholder.typicode.com/users",
        startedSendingAction: {
          type: "STARTED_FETCHING_USERS",
          payload: null
        },
        finishedSendingAction: {
          type: "FINISHED_FETCHING_USERS",
          payload: null
        },
        successAction: {
          type: "UPDATE_USERS_WITH_FETCHED",
          payload: {}
        },
        failureAction: {
          type: "FAILED_FETCHING_USERS",
          payload: {}
        }
      }
    };
    expect((0, _getAsyncActions2.default)(action.payload)).toEqual({
      successAction: {
        type: "UPDATE_USERS_WITH_FETCHED",
        payload: {}
      },
      startedSendingAction: {
        type: "STARTED_FETCHING_USERS",
        payload: null
      },
      finishedSendingAction: {
        type: "FINISHED_FETCHING_USERS",
        payload: null
      },
      failureAction: {
        type: "FAILED_FETCHING_USERS",
        payload: {}
      }
    });
  });
});
