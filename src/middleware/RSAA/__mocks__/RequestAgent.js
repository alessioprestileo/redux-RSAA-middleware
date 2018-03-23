// @flow

import type { Dispatch } from 'redux';
import type { Action } from '../types';

export default class RequestAgent {
  constructor(err: ?Object = null, res: ?Object = null) {
    if (!(err || res)) {
      this.err = {};
    }
    this.err = this.err || err;
    this.res = res;
  }

  request = (method: string, path: string) => {
    this.method = method;
    this.path = path;
    return this;
  };

  query = (query: string | Object) => {
    this.queryProp = query;
    return this;
  };

  send = (body: Object) => {
    this.body = body;
    return this;
  };

  set = (headers: Object) => {
    this.headers = headers;
    return this;
  };

  // prettier-ignore
  end = (callback: (
    ?(string | Object),
    ?(string | Object)
  ) => Dispatch<Action>): Dispatch<Action> => callback(this.err, this.res);

  err: ?Object;
  res: ?Object;
  method: string;
  path: string;
  queryProp: string | Object;
  body: Object;
  headers: Object;
}
