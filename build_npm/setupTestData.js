"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./index");

var _RequestAgent = require("./__mocks__/RequestAgent");

var _RequestAgent2 = _interopRequireDefault(_RequestAgent);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/* eslint-env jest */

var setupTestData = function setupTestData(inputTestData) {
  var requestOutcome =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var state = { testing: true };
  var dispatch = jest.fn();
  var api = {
    dispatch: dispatch,
    getState: function getState() {
      return state;
    }
  };

  var requestAgentFailing = new _RequestAgent2.default();
  var requestAgentSucceeding = new _RequestAgent2.default(null, {
    success: true
  });
  inputTestData.dispatch = dispatch; // eslint-disable-line no-param-reassign

  switch (requestOutcome) {
    case "NONE":
      // eslint-disable-next-line no-param-reassign
      inputTestData.middleware = (0, _index.testableRSAAMiddleware)({})(api)(
        dispatch
      );
      break;
    case "FAILURE":
      // eslint-disable-next-line no-param-reassign
      inputTestData.middleware = (0, _index.testableRSAAMiddleware)(
        requestAgentFailing.request
      )(api)(dispatch);
      break;
    case "SUCCESS":
      // prettier-ignore
      // eslint-disable-next-line no-param-reassign
      inputTestData.middleware = (0, _index.testableRSAAMiddleware)(requestAgentSucceeding.request)(api)(dispatch);
      break;
    default:
      // eslint-disable-next-line no-param-reassign
      inputTestData.middleware = (0, _index.testableRSAAMiddleware)({})(api)(
        dispatch
      );
      break;
  }
};

exports.default = setupTestData;
