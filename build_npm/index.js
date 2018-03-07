"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testableRSAAMiddleware = undefined;

var _superagent = require("superagent");

var _superagent2 = _interopRequireDefault(_superagent);

var _actionTypes = require("./actionTypes");

var _getAsyncActions2 = require("./getAsyncActions");

var _getAsyncActions3 = _interopRequireDefault(_getAsyncActions2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// prettier-ignore
var testableRSAAMiddleware = exports.testableRSAAMiddleware = function testableRSAAMiddleware(requestAgent) {
  return function (api) {
    return function (next) {
      return function (action) {
        if (action.type !== _actionTypes.RSAA) {
          return next(action);
        }

        var _getAsyncActions = (0, _getAsyncActions3.default)(action.payload),
            failureAction = _getAsyncActions.failureAction,
            successAction = _getAsyncActions.successAction,
            startedSendingAction = _getAsyncActions.startedSendingAction,
            finishedSendingAction = _getAsyncActions.finishedSendingAction;

        var dispatch = api.dispatch;
        var _action$payload = action.payload,
            _action$payload$metho = _action$payload.method,
            method = _action$payload$metho === undefined ? 'GET' : _action$payload$metho,
            _action$payload$path = _action$payload.path,
            path = _action$payload$path === undefined ? '' : _action$payload$path,
            _action$payload$query = _action$payload.query,
            query = _action$payload$query === undefined ? '' : _action$payload$query;


        dispatch(startedSendingAction);

        requestAgent(method, path).query(query).end(function (err, res) {
          if (err) {
            failureAction.payload.error = err;
            var date = new Date(Date.now());
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
    };
  };
};

// prettier-ignore

var RSAAMiddleware = testableRSAAMiddleware(_superagent2.default);

exports.default = RSAAMiddleware;
