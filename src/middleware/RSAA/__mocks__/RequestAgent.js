export default class RequestAgent {
  constructor(err = null, res = null) {
    if (!(err || res)) {
      this.err = {};
    }
    this.err = this.err || err;
    this.res = res;

    this.request = (method, path) => {
      this.method = method;
      this.path = path;
      return this;
    };

    this.query = (queryString) => {
      this.queryProp = queryString;
      return this;
    };

    this.end = callback => callback(this.err, this.res);
  }
}
