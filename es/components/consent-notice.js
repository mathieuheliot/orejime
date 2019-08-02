import _typeof from "@babel/runtime/helpers/typeof";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React from 'react';
import { getPurposes } from '../utils/config';

var ConsentNotice =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ConsentNotice, _React$Component);

  function ConsentNotice() {
    _classCallCheck(this, ConsentNotice);

    return _possibleConstructorReturn(this, _getPrototypeOf(ConsentNotice).apply(this, arguments));
  }

  _createClass(ConsentNotice, [{
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
      var purposes = getPurposes(config);
      var purposesText = purposes.map(function (purpose) {
        return t(['purposes', purpose]);
      }).join(", ");
      var title = t(['consentNotice', 'title']);
      return React.createElement("div", {
        "aria-hidden": isModalVisible,
        className: ns("Notice".concat(isMandatory ? ' Notice--mandatory' : ''))
      }, React.createElement("div", {
        className: ns('Notice-body')
      }, config.logo && React.createElement("div", {
        className: ns('Notice-logoContainer')
      }, React.createElement("img", {
        src: _typeof(config.logo) == 'object' ? config.logo.src : config.logo,
        alt: _typeof(config.logo) == 'object' && config.logo.alt ? config.logo.alt : '',
        className: ns('Notice-logo')
      })), React.createElement("div", {
        className: ns('Notice-text')
      }, title && React.createElement("h1", {
        className: ns('Notice-title'),
        id: "orejime-notice-title"
      }, title), React.createElement("p", {
        className: ns('Notice-description')
      }, t(['consentNotice', 'description'], {
        purposes: React.createElement("strong", {
          key: "purposes",
          className: ns('Notice-purposes')
        }, purposesText)
      }), t(['consentNotice', 'privacyPolicy', 'text'], {
        privacyPolicy: React.createElement("a", {
          key: "privacyPolicyLink",
          className: ns('Notice-privacyPolicyLink'),
          href: config.privacyPolicy
        }, t(['consentNotice', 'privacyPolicy', 'name']))
      }))), manager.changed && React.createElement("p", {
        className: ns('Notice-changes')
      }, t(['consentNotice', 'changeDescription'])), React.createElement("ul", {
        className: ns('Notice-actions')
      }, React.createElement("li", {
        className: ns('Notice-actionItem Notice-actionItem--save')
      }, React.createElement("button", {
        className: ns('Button Button--save Notice-button Notice-saveButton'),
        type: "button",
        onClick: onSaveRequest
      }, t(['accept']))), React.createElement("li", {
        className: ns('Notice-actionItem Notice-actionItem--decline')
      }, React.createElement("button", {
        className: ns('Button Button--decline Notice-button Notice-declineButton'),
        type: "button",
        onClick: onDeclineRequest
      }, t(['decline']))), React.createElement("li", {
        className: ns('Notice-actionItem Notice-actionItem--info')
      }, React.createElement("button", {
        type: "button",
        className: ns('Button Button--info Notice-learnMoreButton'),
        onClick: onConfigRequest
      }, t(['consentNotice', 'learnMore']))))));
    }
  }]);

  return ConsentNotice;
}(React.Component);

export { ConsentNotice as default };