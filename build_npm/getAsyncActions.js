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
  return {
    failureMessage:
      'Failed to send "' +
      method +
      '" request to "' +
      (path !== "" ? path : "NO_PATH") +
      '"',
    successMessage:
      'Successfully sent "' +
      method +
      '" request to "' +
      (path !== "" ? path : "NO_PATH") +
      '"',
    startedSendingMessage:
      'Started sending "' +
      method +
      '" request to "' +
      (path !== "" ? path : "NO_PATH") +
      '"',
    finishedSendingMessage:
      'Finished sending "' +
      method +
      '" request to "' +
      (path !== "" ? path : "NO_PATH") +
      '"'
  };
};

var getAsyncActions = function getAsyncActions(payload) {
  var method = payload.method,
    path = payload.path;

  var defaultMessages = getAsyncMessages(method, path);

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
