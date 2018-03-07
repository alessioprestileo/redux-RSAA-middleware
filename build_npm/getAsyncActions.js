"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionTypes = require("./actionTypes");

var getAsyncMessages = function getAsyncMessages() {
  var method =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "GET";
  var path =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var query =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  return {
    failureMessage:
      'Failed to send "' +
      method +
      '" request to "' +
      (path !== "" ? path : "NO_PATH") +
      '" with query "' +
      (query !== "" ? query : "NO_QUERY") +
      '"',
    successMessage:
      'Successfully sent "' +
      method +
      '" request to "' +
      (path !== "" ? path : "NO_PATH") +
      '" with query "' +
      (query !== "" ? query : "NO_QUERY") +
      '"',
    startedSendingMessage:
      'Started sending "' +
      method +
      '" request to "' +
      (path !== "" ? path : "NO_PATH") +
      '" with query "' +
      (query !== "" ? query : "NO_QUERY") +
      '"',
    finishedSendingMessage:
      'Finished sending "' +
      method +
      '" request to "' +
      (path !== "" ? path : "NO_PATH") +
      '" with query "' +
      (query !== "" ? query : "NO_QUERY") +
      '"'
  };
}; // Flow

var getAsyncActions = function getAsyncActions(payload) {
  var method = payload.method,
    path = payload.path,
    query = payload.query;

  var defaultMessages = getAsyncMessages(method, path, query);

  return {
    failureAction: payload.failureAction || {
      type: _actionTypes.API_CALL_FAILURE,
      payload: {
        failureMessage: defaultMessages.failureMessage,
        error: {},
        errorTime: ""
      }
    },
    successAction: payload.successAction || {
      type: _actionTypes.API_CALL_SUCCESS,
      payload: {
        successMessage: defaultMessages.successMessage,
        response: {}
      }
    },
    startedSendingAction: payload.startedSendingAction || {
      type: _actionTypes.API_CALL_STARTED_SENDING,
      payload: {
        startedSendingMessage: defaultMessages.startedSendingMessage
      }
    },
    finishedSendingAction: payload.finishedSendingAction || {
      type: _actionTypes.API_CALL_FINISHED_SENDING,
      payload: {
        finishedSendingMessage: defaultMessages.finishedSendingMessage
      }
    }
  };
};

exports.default = getAsyncActions;
