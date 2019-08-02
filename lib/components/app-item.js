"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var AppItem =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(AppItem, _React$Component);

  function AppItem() {
    (0, _classCallCheck2.default)(this, AppItem);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AppItem).apply(this, arguments));
  }

  (0, _createClass2.default)(AppItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          checked = _this$props.checked,
          onToggle = _this$props.onToggle,
          name = _this$props.name,
          title = _this$props.title,
          description = _this$props.description,
          t = _this$props.t,
          ns = _this$props.ns;
      var required = this.props.required || false;
      var optOut = this.props.optOut || false;
      var purposes = this.props.purposes || [];

      var onChange = function onChange(e) {
        onToggle(e.target.checked);
      };

      var id = "orejime-app-item-".concat(name);
      var isChecked = checked || required;
      var purposesText = purposes.map(function (purpose) {
        return t(['purposes', purpose]);
      }).join(", ");
      var optOutText = optOut ? _react.default.createElement("span", {
        className: ns('AppItem-optOut'),
        title: t(['app', 'optOut', 'description'])
      }, t(['app', 'optOut', 'title'])) : '';
      var requiredText = required ? _react.default.createElement("span", {
        className: ns('AppItem-required'),
        title: t(['app', 'required', 'description'])
      }, t(['app', 'required', 'title'])) : '';
      var purposesEl = purposes.length > 0 ? _react.default.createElement("p", {
        className: ns('AppItem-purposes')
      }, t(['app', purposes.length > 1 ? 'purposes' : 'purpose']), ": ", purposesText) : null;
      var switchLabel = isChecked ? 'enabled' : 'disabled';
      return _react.default.createElement("div", {
        className: ns('AppItem')
      }, _react.default.createElement("input", {
        id: id,
        className: ns('AppItem-input'),
        "aria-describedby": "".concat(id, "-description"),
        disabled: required,
        checked: isChecked,
        type: "checkbox",
        onChange: onChange
      }), _react.default.createElement("label", (0, _extends2.default)({
        htmlFor: id,
        className: ns('AppItem-label')
      }, required ? {
        tabIndex: "0"
      } : {}), _react.default.createElement("span", {
        className: ns('AppItem-title')
      }, title), requiredText, optOutText, _react.default.createElement("span", {
        className: ns("AppItem-switch ".concat(required ? 'AppItem-switch--disabled' : ''))
      }, _react.default.createElement("div", {
        className: ns('AppItem-slider')
      }), _react.default.createElement("div", {
        "aria-hidden": "true",
        className: ns('AppItem-switchLabel')
      }, t(switchLabel)))), _react.default.createElement("div", {
        id: "".concat(id, "-description"),
        className: ns('AppItem-fullDescription')
      }, _react.default.createElement("p", {
        className: ns('AppItem-description')
      }, description || t([name, 'description'])), purposesEl));
    }
  }]);
  return AppItem;
}(_react.default.Component);

exports.default = AppItem;