"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _config = require("../utils/config");

var ConsentNotice =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ConsentNotice, _React$Component);

  function ConsentNotice() {
    (0, _classCallCheck2.default)(this, ConsentNotice);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ConsentNotice).apply(this, arguments));
  }

  (0, _createClass2.default)(ConsentNotice, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          manager = _this$props.manager,
          isModalVisible = _this$props.isModalVisible,
          isMandatory = _this$props.isMandatory,
          t = _this$props.t,
          ns = _this$props.ns,
          onSaveRequest = _this$props.onSaveRequest,
          onDeclineRequest = _this$props.onDeclineRequest,
          onConfigRequest = _this$props.onConfigRequest;
      var purposes = (0, _config.getPurposes)(config);
      var purposesText = purposes.map(function (purpose) {
        return t(['purposes', purpose]);
      }).join(", ");
      var title = t(['consentNotice', 'title']);
      return _react.default.createElement("div", {
        "aria-hidden": isModalVisible,
        className: ns("notice".concat(isMandatory ? ' notice--mandatory' : ''))
      }, config.logo && _react.default.createElement("div", {
        className: ns('notice__logo')
      }, _react.default.createElement("img", {
        src: (0, _typeof2.default)(config.logo) == 'object' ? config.logo.src : config.logo,
        alt: (0, _typeof2.default)(config.logo) == 'object' && config.logo.alt ? config.logo.alt : '',
        className: ns('Notice-logo')
      })), _react.default.createElement("div", {
        className: ns('notice__text')
      }, title && _react.default.createElement("h1", {
        className: ns('notice-title'),
        id: "orejime-notice-title"
      }, title), _react.default.createElement("p", {
        className: ns('notice-description')
      }, t(['consentNotice', 'description'], {
        purposes: _react.default.createElement("strong", {
          key: "purposes",
          className: ns('notice-purposes')
        }, purposesText)
      }), t(['consentNotice', 'privacyPolicy', 'text'], {
        privacyPolicy: _react.default.createElement("a", {
          key: "privacyPolicyLink",
          className: ns('notice-link'),
          href: config.privacyPolicy
        }, t(['consentNotice', 'privacyPolicy', 'name']))
      }))), manager.changed && _react.default.createElement("p", {
        className: ns('notice-changes')
      }, t(['consentNotice', 'changeDescription'])), _react.default.createElement("ul", {
        className: ns('notice__actions')
      }, _react.default.createElement("li", {
        className: ns('notice__actions__item notice__actions__item--save')
      }, _react.default.createElement("button", {
        className: "button button--primary",
        type: "button",
        onClick: onSaveRequest
      }, t(['accept']))), _react.default.createElement("li", {
        className: ns('notice__actions__item notice__actions__item--decline')
      }, _react.default.createElement("button", {
        className: "button button--default",
        type: "button",
        onClick: onDeclineRequest
      }, t(['decline'])))), _react.default.createElement("div", {
        className: ns('notice__settings')
      }, _react.default.createElement("button", {
        type: "button",
        className: "button",
        onClick: onConfigRequest
      }, t(['consentNotice', 'learnMore']))));
    }
  }]);
  return ConsentNotice;
}(_react.default.Component);

exports.default = ConsentNotice;