"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var RequestAgent = function RequestAgent() {
  var _this = this;

  var err =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var res =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  _classCallCheck(this, RequestAgent);

  this.request = function(method, path) {
    _this.method = method;
    _this.path = path;
    return _this;
  };

  this.query = function(query) {
    _this.queryProp = query;
    return _this;
  };

  this.send = function(body) {
    _this.body = body;
    return _this;
  };

  this.set = function(headers) {
    _this.headers = headers;
    return _this;
  };

  this.end = function(callback) {
    return callback(_this.err, _this.res);
  };

  if (!(err || res)) {
    this.err = {};
  }
  this.err = this.err || err;
  this.res = res;
};

exports.default = RequestAgent;
