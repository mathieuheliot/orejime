"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.language = language;
exports.t = t;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

String.prototype.format = function () {
  "use strict";

  var str = this.toString();
  var t = (0, _typeof2.default)(arguments[0]);
  var args;
  if (arguments.length == 0) args = {};else args = "string" === t || "number" === t ? Array.prototype.slice.call(arguments) : arguments[0];
  var splits = [];
  var s = str;

  while (s.length > 0) {
    var m = s.match(/\{(?!\{)([\w\d]+)\}(?!\})/);

    if (m !== null) {
      var left = s.substr(0, m.index);
      var sep = s.substr(m.index, m[0].length);
      s = s.substr(m.index + m[0].length);
      var n = parseInt(m[1]);
      splits.push(left);

      if (n != n) {
        // not a number
        splits.push(args[m[1]]);
      } else {
        // a numbered argument
        splits.push(args[n]);
      }
    } else {
      splits.push(s);
      s = "";
    }
  }

  return splits;
};

function language() {
  return window.language || document.documentElement.lang || 'en';
}

function hget(d, key, defaultValue) {
  var kl = key;
  if (!Array.isArray(kl)) kl = [kl];
  var cv = d;

  for (var i = 0; i < kl.length; i++) {
    if (cv === undefined) return defaultValue;
    if (cv instanceof Map) cv = cv.get(kl[i]);else cv = cv[kl[i]];
  }

  if (cv === undefined) return defaultValue;
  return cv;
}

function t(trans, lang, debug, key) {
  var kl = key;
  if (!Array.isArray(kl)) kl = [kl];
  var value = hget(trans, [lang].concat((0, _toConsumableArray2.default)(kl)));

  if (value === undefined) {
    if (debug) {
      console.log('[missing translation: {lang}/{key}]'.format({
        key: kl.join("/"),
        lang: lang
      }).join(""));
    }

    return false;
  }

  var params = Array.prototype.slice.call(arguments, 4);
  if (params.length > 0) return value.format.apply(value, (0, _toConsumableArray2.default)(params));
  return value;
}