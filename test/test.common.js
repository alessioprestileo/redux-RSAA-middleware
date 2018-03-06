/* eslint-disable import/no-extraneous-dependencies */

import toJson from 'enzyme-to-json';

const enzymeToSnapshot = shallow => toJson(shallow);

const common = {
  enzymeToSnapshot,
};

export default common;
