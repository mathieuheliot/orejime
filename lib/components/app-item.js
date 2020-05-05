"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var AppItem = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(AppItem, _React$Component);

  var _super = _createSuper(AppItem);

  function AppItem() {
    (0, _classCallCheck2.default)(this, AppItem);
    return _super.apply(this, arguments);
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
        className: ns('app-optOut'),
        title: t(['app', 'optOut', 'description'])
      }, t(['app', 'optOut', 'title'])) : '';
      var requiredText = required ? _react.default.createElement("span", {
        className: ns('app-required'),
        title: t(['app', 'required', 'description'])
      }, t(['app', 'required', 'title'])) : '';
      var purposesEl = purposes.length > 0 ? _react.default.createElement("p", {
        className: ns('app-purposes')
      }, purposesText) : null;
      var switchLabel = isChecked ? 'enabled' : 'disabled';
      return _react.default.createElement("div", {
        className: ns('app')
      }, _react.default.createElement("div", {
        className: "switch"
      }, _react.default.createElement("input", {
        id: id,
        "aria-describedby": "".concat(id, "-description"),
        disabled: required,
        checked: isChecked,
        type: "checkbox",
        onChange: onChange
      }), _react.default.createElement("label", (0, _extends2.default)({
        htmlFor: id
      }, required ? {
        tabIndex: "0"
      } : {}), _react.default.createElement("div", {
        className: ns('app-title')
      }, title, requiredText, optOutText), _react.default.createElement("div", {
        className: "app-description"
      }, description || t([name, 'description'])), purposesEl)));
    }
  }]);
  return AppItem;
}(_react.default.Component);

exports.default = AppItem;