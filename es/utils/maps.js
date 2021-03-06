function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

export function convertToMap(d) {
  var dm = new Map([]);

  for (var _i = 0, _Object$keys = Object.keys(d); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var value = d[key];
    if (!(typeof key == 'string')) continue;

    if (typeof value == 'string') {
      dm.set(key, value);
    } else {
      dm.set(key, convertToMap(value));
    }
  }

  return dm;
}
export function update(d, ed, overwrite, clone) {
  var assign = function assign(d, key, value) {
    if (value instanceof Map) {
      var map = new Map([]); //we deep-clone the map

      update(map, value, true, false);
      d.set(key, map);
    } else d.set(key, value);
  };

  if (!(ed instanceof Map) || !(d instanceof Map)) throw "Parameters are not maps!";
  if (overwrite === undefined) overwrite = true;
  if (clone === undefined) clone = false;
  if (clone) d = new d.constructor(d);

  var _iterator = _createForOfIteratorHelper(ed.keys()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;
      var value = ed.get(key);
      var dvalue = d.get(key);

      if (!d.has(key)) {
        assign(d, key, value);
      } else if (value instanceof Map && dvalue instanceof Map) {
        d.set(key, update(dvalue, value, overwrite, clone));
      } else {
        if (!overwrite) continue;
        assign(d, key, value);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return d;
}