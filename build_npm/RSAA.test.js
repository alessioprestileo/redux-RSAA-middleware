"use strict";

var _actionTypes = require("./actionTypes");

var _getAsyncActions = require("./getAsyncActions");

var _getAsyncActions2 = _interopRequireDefault(_getAsyncActions);

var _setupTestData = require("./setupTestData");

var _setupTestData2 = _interopRequireDefault(_setupTestData);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step("next", value);
            },
            function(err) {
              step("throw", err);
            }
          );
        }
      }
      return step("next");
    });
  };
} /* eslint-env jest */
/* eslint-disable import/no-extraneous-dependencies */

var testData = {};

var actionRSAADefault = {
  type: "RSAA",
  payload: {}
};

var actionRSAAWithInputs = {
  type: "RSAA",
  payload: {
    failureAction: { type: _actionTypes.API_CALL_FAILURE, payload: {} },
    finishedSendingAction: {
      type: _actionTypes.API_CALL_FINISHED_SENDING,
      payload: {}
    },
    startedSendingAction: {
      type: _actionTypes.API_CALL_STARTED_SENDING,
      payload: {}
    },
    successAction: { type: _actionTypes.API_CALL_SUCCESS, payload: {} }
  }
};

var actionNotRSAA = {
  type: "NOT_RSAA",
  payload: {}
};

describe("RSAA middleware with action of type other than RSAA", function() {
  beforeEach(function() {
    return (0, _setupTestData2.default)(testData);
  });

  it("forwards the input action", function() {
    testData.middleware(actionNotRSAA);
    expect(testData.dispatch).toBeCalledWith(actionNotRSAA);
  });
});

describe("RSAA middleware with action of type RSAA, failing api call and no input actions given", function() {
  beforeEach(function() {
    return (0, _setupTestData2.default)(testData, "FAILURE");
  });

  it(
    "dispatches default startedSendingAction, then default async actions and then input action",
    _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
        var failureAction;
        return regeneratorRuntime.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.next = 2;
                  return expect(testData.middleware(actionRSAADefault));

                case 2:
                  expect(testData.dispatch.mock.calls.length).toBe(4);

                  expect(testData.dispatch.mock.calls[0][0]).toEqual(
                    (0, _getAsyncActions2.default)({}).startedSendingAction
                  );

                  failureAction = testData.dispatch.mock.calls[1][0];

                  failureAction.payload.errorTime = "";
                  expect(failureAction).toEqual(
                    (0, _getAsyncActions2.default)({}).failureAction
                  );

                  expect(testData.dispatch.mock.calls[2][0]).toEqual(
                    (0, _getAsyncActions2.default)({}).finishedSendingAction
                  );
                  expect(testData.dispatch.mock.calls[3][0]).toEqual(
                    actionRSAADefault
                  );

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          },
          _callee,
          undefined
        );
      })
    )
  );
});

describe("RSAA middleware with action of type RSAA, failing api call and input actions", function() {
  beforeEach(function() {
    return (0, _setupTestData2.default)(testData, "FAILURE");
  });

  it(
    "dispatches given startedSendingAction, then given async actions and then input action",
    _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
        var expectedFailureAction, failureAction;
        return regeneratorRuntime.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  _context2.next = 2;
                  return expect(testData.middleware(actionRSAAWithInputs));

                case 2:
                  expect(testData.dispatch.mock.calls.length).toBe(4);

                  // prettier-ignore
                  expect(testData.dispatch.mock.calls[0][0]).toEqual(actionRSAAWithInputs.payload.startedSendingAction);

                  expectedFailureAction =
                    actionRSAAWithInputs.payload.failureAction;
                  failureAction = testData.dispatch.mock.calls[1][0];

                  failureAction.payload.errorTime =
                    expectedFailureAction &&
                    expectedFailureAction.payload &&
                    expectedFailureAction.payload.errorTime
                      ? expectedFailureAction.payload.errorTime
                      : "";
                  expect(failureAction).toEqual(expectedFailureAction);

                  // prettier-ignore
                  expect(testData.dispatch.mock.calls[2][0]).toEqual(actionRSAAWithInputs.payload.finishedSendingAction);
                  expect(testData.dispatch.mock.calls[3][0]).toEqual(
                    actionRSAAWithInputs
                  );

                case 10:
                case "end":
                  return _context2.stop();
              }
            }
          },
          _callee2,
          undefined
        );
      })
    )
  );
});

describe("RSAA middleware with action of type RSAA, succeeding api call and no input actions given", function() {
  beforeEach(function() {
    return (0, _setupTestData2.default)(testData, "SUCCESS");
  });

  it(
    "dispatches default startedSendingAction, then default async actions and then input action",
    _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee3() {
        var expectedSuccessAction, successAction;
        return regeneratorRuntime.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  _context3.next = 2;
                  return expect(testData.middleware(actionRSAADefault));

                case 2:
                  expect(testData.dispatch.mock.calls.length).toBe(4);

                  expect(testData.dispatch.mock.calls[0][0]).toEqual(
                    (0, _getAsyncActions2.default)({}).startedSendingAction
                  );

                  expectedSuccessAction = (0, _getAsyncActions2.default)({})
                    .successAction;
                  successAction = testData.dispatch.mock.calls[1][0];

                  successAction.payload.response =
                    expectedSuccessAction.payload.response;
                  expect(successAction).toEqual(expectedSuccessAction);

                  expect(testData.dispatch.mock.calls[2][0]).toEqual(
                    (0, _getAsyncActions2.default)({}).finishedSendingAction
                  );
                  expect(testData.dispatch.mock.calls[3][0]).toEqual(
                    actionRSAADefault
                  );

                case 10:
                case "end":
                  return _context3.stop();
              }
            }
          },
          _callee3,
          undefined
        );
      })
    )
  );
});

describe("RSAA middleware with action of type RSAA, succeeding api call and input actions", function() {
  beforeEach(function() {
    return (0, _setupTestData2.default)(testData, "SUCCESS");
  });

  it(
    "dispatches given startedSendingAction, then given async actions and then input action",
    _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee4() {
        var expectedFailureAction, failureAction;
        return regeneratorRuntime.wrap(
          function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  _context4.next = 2;
                  return expect(testData.middleware(actionRSAAWithInputs));

                case 2:
                  expect(testData.dispatch.mock.calls.length).toBe(4);

                  // prettier-ignore
                  expect(testData.dispatch.mock.calls[0][0]).toEqual(actionRSAAWithInputs.payload.startedSendingAction);

                  expectedFailureAction =
                    actionRSAAWithInputs.payload.successAction;
                  failureAction = testData.dispatch.mock.calls[1][0];

                  failureAction.payload.errorTime =
                    expectedFailureAction &&
                    expectedFailureAction.payload &&
                    expectedFailureAction.payload.errorTime
                      ? expectedFailureAction.payload.errorTime
                      : "";
                  expect(failureAction).toEqual(expectedFailureAction);

                  // prettier-ignore
                  expect(testData.dispatch.mock.calls[2][0]).toEqual(actionRSAAWithInputs.payload.finishedSendingAction);
                  expect(testData.dispatch.mock.calls[3][0]).toEqual(
                    actionRSAAWithInputs
                  );

                case 10:
                case "end":
                  return _context4.stop();
              }
            }
          },
          _callee4,
          undefined
        );
      })
    )
  );
});
