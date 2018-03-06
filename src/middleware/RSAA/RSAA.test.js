/* eslint-env jest */
/* eslint-disable import/no-extraneous-dependencies */

// @flow

import type { RSAAAction } from './types';
import getAsyncActions from './getAsyncActions';
import setupTestData from './setupTestData';

const testData = {};

const actionRSAADefault: RSAAAction = {
  type: 'RSAA',
  payload: {},
};

const actionRSAAWithInputs: RSAAAction = {
  type: 'RSAA',
  payload: {
    failureAction: { type: 'FAILURE', payload: {} },
    successAction: { type: 'SUCCESS', payload: {} },
    startedSendingAction: { type: 'STARTED_SENDING', payload: {} },
    finishedSendingAction: { type: 'FINISHED_SENDING', payload: {} },
  },
};

const actionNotRSAA: RSAAAction = {
  type: 'NOT_RSAA',
  payload: {},
};

describe('RSAA middleware with action of type other than RSAA', () => {
  beforeEach(() => setupTestData(testData));

  it('forwards the input action', () => {
    testData.middleware(actionNotRSAA);
    expect(testData.dispatch).toBeCalledWith(actionNotRSAA);
  });
});

describe('RSAA middleware with action of type RSAA, failing api call and no input actions given', () => {
  beforeEach(() => setupTestData(testData, 'FAILURE'));

  it('dispatches default startedSendingAction, then default async actions and then input action', async () => {
    await expect(testData.middleware(actionRSAADefault));
    expect(testData.dispatch.mock.calls.length).toBe(4);

    expect(testData.dispatch.mock.calls[0][0]).toEqual(getAsyncActions({}).startedSendingAction);

    const failureAction = testData.dispatch.mock.calls[1][0];
    failureAction.payload.errorTime = '';
    expect(failureAction).toEqual(getAsyncActions({}).failureAction);

    expect(testData.dispatch.mock.calls[2][0]).toEqual(getAsyncActions({}).finishedSendingAction);
    expect(testData.dispatch.mock.calls[3][0]).toEqual(actionRSAADefault);
  });
});

describe('RSAA middleware with action of type RSAA, failing api call and input actions', () => {
  beforeEach(() => setupTestData(testData, 'FAILURE'));

  it('dispatches given startedSendingAction, then given async actions and then input action', async () => {
    await expect(testData.middleware(actionRSAAWithInputs));
    expect(testData.dispatch.mock.calls.length).toBe(4);

    // prettier-ignore
    expect(testData.dispatch.mock.calls[0][0])
      .toEqual(actionRSAAWithInputs.payload.startedSendingAction);

    const expectedFailureAction = actionRSAAWithInputs.payload.failureAction;
    const failureAction = testData.dispatch.mock.calls[1][0];
    failureAction.payload.errorTime =
      expectedFailureAction &&
      expectedFailureAction.payload &&
      expectedFailureAction.payload.errorTime
        ? expectedFailureAction.payload.errorTime
        : '';
    expect(failureAction).toEqual(expectedFailureAction);

    // prettier-ignore
    expect(testData.dispatch.mock.calls[2][0])
      .toEqual(actionRSAAWithInputs.payload.finishedSendingAction);
    expect(testData.dispatch.mock.calls[3][0]).toEqual(actionRSAAWithInputs);
  });
});

describe('RSAA middleware with action of type RSAA, succeeding api call and no input actions given', () => {
  beforeEach(() => setupTestData(testData, 'SUCCESS'));

  it('dispatches default startedSendingAction, then default async actions and then input action', async () => {
    await expect(testData.middleware(actionRSAADefault));
    expect(testData.dispatch.mock.calls.length).toBe(4);

    expect(testData.dispatch.mock.calls[0][0]).toEqual(getAsyncActions({}).startedSendingAction);

    const expectedSuccessAction = getAsyncActions({}).successAction;
    const successAction = testData.dispatch.mock.calls[1][0];
    successAction.payload.response = expectedSuccessAction.payload.response;
    expect(successAction).toEqual(expectedSuccessAction);

    expect(testData.dispatch.mock.calls[2][0]).toEqual(getAsyncActions({}).finishedSendingAction);
    expect(testData.dispatch.mock.calls[3][0]).toEqual(actionRSAADefault);
  });
});

describe('RSAA middleware with action of type RSAA, succeeding api call and input actions', () => {
  beforeEach(() => setupTestData(testData, 'SUCCESS'));

  it('dispatches given startedSendingAction, then given async actions and then input action', async () => {
    await expect(testData.middleware(actionRSAAWithInputs));
    expect(testData.dispatch.mock.calls.length).toBe(4);

    // prettier-ignore
    expect(testData.dispatch.mock.calls[0][0])
      .toEqual(actionRSAAWithInputs.payload.startedSendingAction);

    const expectedFailureAction = actionRSAAWithInputs.payload.successAction;
    const failureAction = testData.dispatch.mock.calls[1][0];
    failureAction.payload.errorTime =
      expectedFailureAction &&
      expectedFailureAction.payload &&
      expectedFailureAction.payload.errorTime
        ? expectedFailureAction.payload.errorTime
        : '';
    expect(failureAction).toEqual(expectedFailureAction);

    // prettier-ignore
    expect(testData.dispatch.mock.calls[2][0])
      .toEqual(actionRSAAWithInputs.payload.finishedSendingAction);
    expect(testData.dispatch.mock.calls[3][0]).toEqual(actionRSAAWithInputs);
  });
});
