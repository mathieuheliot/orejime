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
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ed.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return d;
}