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
        className: ns("notice".concat(isMandatory ? ' notice--mandatory' : ''))
      }, config.logo && React.createElement("div", {
        className: ns('notice__logo')
      }, React.createElement("img", {
        src: _typeof(config.logo) == 'object' ? config.logo.src : config.logo,
        alt: _typeof(config.logo) == 'object' && config.logo.alt ? config.logo.alt : '',
        className: ns('Notice-logo')
      })), React.createElement("div", {
        className: ns('notice__text')
      }, title && React.createElement("h1", {
        className: ns('notice-title'),
        id: "orejime-notice-title"
      }, title), React.createElement("p", {
        className: ns('notice-description')
      }, t(['consentNotice', 'description'], {
        purposes: React.createElement("strong", {
          key: "purposes",
          className: ns('notice-purposes')
        }, purposesText)
      }), t(['consentNotice', 'privacyPolicy', 'text'], {
        privacyPolicy: React.createElement("a", {
          key: "privacyPolicyLink",
          className: ns('notice-link'),
          href: config.privacyPolicy
        }, t(['consentNotice', 'privacyPolicy', 'name']))
      }))), manager.changed && React.createElement("p", {
        className: ns('notice-changes')
      }, t(['consentNotice', 'changeDescription'])), React.createElement("ul", {
        className: ns('notice__actions')
      }, React.createElement("li", {
        className: ns('notice__actions__item notice__actions__item--save')
      }, React.createElement("button", {
        className: "button button--primary",
        type: "button",
        onClick: onSaveRequest
      }, t(['accept']))), React.createElement("li", {
        className: ns('notice__actions__item notice__actions__item--decline')
      }, React.createElement("button", {
        className: "button button--default",
        type: "button",
        onClick: onDeclineRequest
      }, t(['decline']))), React.createElement("li", {
        className: ns('notice__actions__item notice__actions__item--info')
      }, React.createElement("button", {
        type: "button",
        className: "button",
        onClick: onConfigRequest
      }, t(['consentNotice', 'learnMore'])))));
    }
  }]);

  return ConsentNotice;
}(React.Component);

export { ConsentNotice as default };