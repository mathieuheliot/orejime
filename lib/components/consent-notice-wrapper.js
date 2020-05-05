"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _config = require("../utils/config");

var _dialog = _interopRequireDefault(require("./dialog"));

var _consentNotice = _interopRequireDefault(require("./consent-notice"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ConsentNoticeWrapper = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ConsentNoticeWrapper, _React$Component);

  var _super = _createSuper(ConsentNoticeWrapper);

  function ConsentNoticeWrapper() {
    (0, _classCallCheck2.default)(this, ConsentNoticeWrapper);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(ConsentNoticeWrapper, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isVisible = _this$props.isVisible,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["isVisible"]);

      if (!this.props.isMandatory && !isVisible) {
        return null;
      }

      var title = this.props.t(['consentNotice', 'title']);
      var ariaProp = title ? {
        aria: {
          'labelledby': 'orejime-notice-title'
        }
      } : {};

      if (this.props.isMandatory) {
        return _react.default.createElement(_dialog.default, (0, _extends2.default)({
          isOpen: isVisible
        }, ariaProp, {
          config: this.props.config,
          portalClassName: this.props.ns('NoticePortal'),
          overlayClassName: isVisible ? 'modal modal--drawer visible' : 'modal modal--drawer',
          className: "drawer"
        }), _react.default.createElement("div", {
          className: "drawer__content"
        }, _react.default.createElement(_consentNotice.default, props)));
      }

      return _react.default.createElement("dialog", {
        className: "dialog rgpd-dialog",
        open: isVisible ? 'open' : false
      }, _react.default.createElement("div", {
        className: "dialog__content"
      }, _react.default.createElement(_consentNotice.default, props)));
    }
  }]);
  return ConsentNoticeWrapper;
}(_react.default.Component);

exports.default = ConsentNoticeWrapper;