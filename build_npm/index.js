"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RSAAMiddleware = exports.testableRSAAMiddleware = undefined;

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
            _action$payload$body = _action$payload.body,
            body = _action$payload$body === undefined ? {} : _action$payload$body,
            _action$payload$heade = _action$payload.headers,
            headers = _action$payload$heade === undefined ? {} : _action$payload$heade,
            _action$payload$metho = _action$payload.method,
            method = _action$payload$metho === undefined ? 'GET' : _action$payload$metho,
            _action$payload$path = _action$payload.path,
            path = _action$payload$path === undefined ? '' : _action$payload$path,
            _action$payload$query = _action$payload.query,
            query = _action$payload$query === undefined ? '' : _action$payload$query;


        dispatch(startedSendingAction);

        var baseRequest = requestAgent(method, path);
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
        baseRequest.end(function (err, res) {
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

var RSAAMiddleware = exports.RSAAMiddleware = testableRSAAMiddleware(_superagent2.default);
