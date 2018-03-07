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

  if (!(err || res)) {
    this.err = {};
  }
  this.err = this.err || err;
  this.res = res;

  this.request = function(method, path) {
    _this.method = method;
    _this.path = path;
    return _this;
  };

  this.query = function(queryString) {
    _this.queryProp = queryString;
    return _this;
  };

  this.end = function(callback) {
    return callback(_this.err, _this.res);
  };
};

exports.default = RequestAgent;
