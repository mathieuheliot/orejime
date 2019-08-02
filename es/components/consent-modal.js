import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React from 'react';
import { Close } from './icons';
import Apps from './apps';
import Dialog from './dialog';

var ConsentModal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ConsentModal, _React$Component);

  function ConsentModal() {
    _classCallCheck(this, ConsentModal);

    return _possibleConstructorReturn(this, _getPrototypeOf(ConsentModal).apply(this, arguments));
  }

  _createClass(ConsentModal, [{
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
      return React.createElement(Dialog, {
        isOpen: isOpen,
        aria: {
          'labelledby': 'orejime-modal-title'
        },
        portalClassName: ns('ModalPortal'),
        overlayClassName: ns('ModalOverlay'),
        className: ns('ModalWrapper'),
        config: config,
        onRequestClose: onHideRequest,
        role: isAlert ? 'alertdialog' : 'dialog'
      }, React.createElement("div", {
        className: ns('Modal')
      }, React.createElement("div", {
        className: ns('Modal-header')
      }, !isAlert && React.createElement("button", {
        title: t(['close']),
        className: ns('Modal-closeButton'),
        type: "button",
        onClick: onHideRequest
      }, React.createElement(Close, {
        t: t,
        ns: ns
      })), React.createElement("h1", {
        className: ns('Modal-title'),
        id: "orejime-modal-title"
      }, t(['consentModal', 'title'])), React.createElement("p", {
        className: ns('Modal-description')
      }, manager.changed && (config.mustConsent || config.noNotice) && React.createElement("p", {
        className: ns('Modal-description')
      }, React.createElement("strong", {
        className: ns('Modal-changes')
      }, t(['consentNotice', 'changeDescription']))), t(['consentModal', 'description']), "\xA0", t(['consentModal', 'privacyPolicy', 'text'], {
        privacyPolicy: React.createElement("a", {
          key: "privacyPolicyLink",
          className: ns('Modal-privacyPolicyLink'),
          onClick: function onClick(e) {
            onHideRequest();
          },
          href: config.privacyPolicy
        }, t(['consentModal', 'privacyPolicy', 'name']))
      }))), React.createElement("form", {
        className: ns('Modal-form')
      }, React.createElement("div", {
        className: ns('Modal-body')
      }, React.createElement(Apps, {
        t: t,
        ns: ns,
        config: config,
        manager: manager
      })), React.createElement("div", {
        className: ns('Modal-footer')
      }, React.createElement("button", {
        className: ns('Button Button--save Modal-saveButton'),
        onClick: onSaveRequest,
        title: t(['saveData'])
      }, t(['save']))))));
    }
  }]);

  return ConsentModal;
}(React.Component);

export { ConsentModal as default };