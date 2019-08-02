"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _icons = require("./icons");

var _apps = _interopRequireDefault(require("./apps"));

var _dialog = _interopRequireDefault(require("./dialog"));

var ConsentModal =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(ConsentModal, _React$Component);

  function ConsentModal() {
    (0, _classCallCheck2.default)(this, ConsentModal);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ConsentModal).apply(this, arguments));
  }

  (0, _createClass2.default)(ConsentModal, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isOpen = _this$props.isOpen,
          onHideRequest = _this$props.onHideRequest,
          onSaveRequest = _this$props.onSaveRequest,
          config = _this$props.config,
          manager = _this$props.manager,
          t = _this$props.t,
          ns = _this$props.ns;
      var isAlert = config.mustConsent && (!manager.confirmed || manager.changed);
      return _react.default.createElement(_dialog.default, {
        isOpen: isOpen,
        aria: {
          'labelledby': 'orejime-modal-title'
        },
        portalClassName: ns('ModalPortal'),
        overlayClassName: "modal",
        className: "dialog",
        config: config,
        onRequestClose: onHideRequest,
        role: isAlert ? 'alertdialog' : 'dialog'
      }, _react.default.createElement("div", {
        className: "dialog__content"
      }, _react.default.createElement("div", {
        className: 'dialog__header'
      }, !isAlert && _react.default.createElement("button", {
        title: t(['close']),
        className: ns('Modal-closeButton'),
        type: "button",
        onClick: onHideRequest
      }, _react.default.createElement(_icons.Close, {
        t: t,
        ns: ns
      })), _react.default.createElement("h1", {
        className: ns('Modal-title'),
        id: "orejime-modal-title"
      }, t(['consentModal', 'title'])), _react.default.createElement("p", {
        className: ns('Modal-description')
      }, manager.changed && (config.mustConsent || config.noNotice) && _react.default.createElement("p", {
        className: ns('Modal-description')
      }, _react.default.createElement("strong", {
        className: ns('Modal-changes')
      }, t(['consentNotice', 'changeDescription']))), t(['consentModal', 'description']), "\xA0", t(['consentModal', 'privacyPolicy', 'text'], {
        privacyPolicy: _react.default.createElement("a", {
          key: "privacyPolicyLink",
          className: ns('Modal-privacyPolicyLink'),
          onClick: function onClick(e) {
            onHideRequest();
          },
          href: config.privacyPolicy
        }, t(['consentModal', 'privacyPolicy', 'name']))
      }))), _react.default.createElement("form", {
        className: "dialog__body"
      }, _react.default.createElement("div", {
        className: ns('Modal-body')
      }, _react.default.createElement(_apps.default, {
        t: t,
        ns: ns,
        config: config,
        manager: manager
      })), _react.default.createElement("div", {
        className: ns('Modal-footer')
      }, _react.default.createElement("button", {
        className: ns('Button Button--save Modal-saveButton'),
        onClick: onSaveRequest,
        title: t(['saveData'])
      }, t(['save'])))), _react.default.createElement("div", {
        className: "dialog__footer"
      }, _react.default.createElement("button", {
        className: ns('Button Button--save Modal-saveButton'),
        onClick: onSaveRequest,
        title: t(['saveData'])
      }, t(['save'])))));
    }
  }]);
  return ConsentModal;
}(_react.default.Component);

exports.default = ConsentModal;