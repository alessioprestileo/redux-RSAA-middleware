// @flow

import type { State } from './types';

const initialState: State = {
  sampleProps: {
    sampleProp1: 'initial1',
    sampleProp2: 'initial2',
  },
  users: {
    data: [],
    fetching: false,
  },
  others: {},
};

export default initialState;
