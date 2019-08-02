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
        overlayClassName: isOpen ? 'modal visible' : 'modal',
        className: "dialog",
        config: config,
        onRequestClose: onHideRequest,
        role: isAlert ? 'alertdialog' : 'dialog'
      }, React.createElement("div", {
        className: "dialog__content"
      }, React.createElement("div", {
        className: 'dialog__header'
      }, !isAlert && React.createElement("button", {
        title: t(['close']),
        className: ns('modal-close'),
        type: "button",
        onClick: onHideRequest
      }, "Close"), React.createElement("h1", {
        className: ns('modal-title'),
        id: "orejime-modal-title"
      }, t(['consentModal', 'title'])), React.createElement("p", {
        className: ns('modal-description')
      }, manager.changed && (config.mustConsent || config.noNotice) && React.createElement("p", {
        className: ns('modal-description')
      }, React.createElement("strong", {
        className: ns('Modal-changes')
      }, t(['consentNotice', 'changeDescription']))), t(['consentModal', 'description']), "\xA0", t(['consentModal', 'privacyPolicy', 'text'], {
        privacyPolicy: React.createElement("a", {
          key: "privacyPolicyLink",
          className: "link",
          onClick: function onClick(e) {
            onHideRequest();
          },
          href: config.privacyPolicy
        }, t(['consentModal', 'privacyPolicy', 'name']))
      }))), React.createElement("div", {
        className: "dialog__body"
      }, React.createElement("form", {
        className: ns('form')
      }, React.createElement(Apps, {
        t: t,
        ns: ns,
        config: config,
        manager: manager
      }))), React.createElement("div", {
        className: "dialog__footer"
      }, React.createElement("button", {
        className: "button button--primary",
        onClick: onSaveRequest,
        title: t(['saveData'])
      }, t(['save'])))));
    }
  }]);

  return ConsentModal;
}(React.Component);

export { ConsentModal as default };