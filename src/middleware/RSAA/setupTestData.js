/* eslint-env jest */

// @flow

import type { Dispatch } from 'redux';
import type { RSAAState, RSAAAction, MiddlewareAPI } from './types';
import { testableRSAAMiddleware } from './index';
import RequestAgent from './__mocks__/RequestAgent';

const setupTestData = (
  inputTestData: Object,
  requestOutcome: ?string = null,
) => {
  const state: RSAAState = { testing: true };
  const dispatch: Dispatch<RSAAAction> = jest.fn();
  const api: MiddlewareAPI<RSAAState, RSAAAction, Dispatch<RSAAAction>> = {
    dispatch,
    getState: () => state,
  };

  const requestAgentFailing = new RequestAgent();
  const requestAgentSucceeding = new RequestAgent(null, { success: true });
  inputTestData.dispatch = dispatch; // eslint-disable-line no-param-reassign

  switch (requestOutcome) {
    case 'NONE':
      // eslint-disable-next-line no-param-reassign
      inputTestData.middleware = testableRSAAMiddleware({})(api)(dispatch);
      break;
    case 'FAILURE':
      // eslint-disable-next-line no-param-reassign
      inputTestData.middleware = testableRSAAMiddleware(requestAgentFailing.request)(api)(dispatch);
      break;
    case 'SUCCESS':
      // prettier-ignore
      // eslint-disable-next-line no-param-reassign
      inputTestData.middleware =
        testableRSAAMiddleware(requestAgentSucceeding.request)(api)(dispatch);
      break;
    default:
      // eslint-disable-next-line no-param-reassign
      inputTestData.middleware = testableRSAAMiddleware({})(api)(dispatch);
      break;
  }
};

export default setupTestData;
