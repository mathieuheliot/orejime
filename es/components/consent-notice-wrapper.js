import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
import { getPurposes } from '../utils/config';
import Dialog from './dialog';
import ConsentNotice from './consent-notice';

var ConsentNoticeWrapper = /*#__PURE__*/function (_React$Component) {
  _inherits(ConsentNoticeWrapper, _React$Component);

  var _super = _createSuper(ConsentNoticeWrapper);

  function ConsentNoticeWrapper() {
    _classCallCheck(this, ConsentNoticeWrapper);

    return _super.apply(this, arguments);
  }

  _createClass(ConsentNoticeWrapper, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isVisible = _this$props.isVisible,
          props = _objectWithoutProperties(_this$props, ["isVisible"]);

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
        return React.createElement(Dialog, _extends({
          isOpen: isVisible
        }, ariaProp, {
          config: this.props.config,
          portalClassName: this.props.ns('NoticePortal'),
          overlayClassName: isVisible ? 'modal modal--drawer visible' : 'modal modal--drawer',
          className: "drawer"
        }), React.createElement("div", {
          className: "drawer__content"
        }, React.createElement(ConsentNotice, props)));
      }

      return React.createElement("dialog", {
        className: "dialog rgpd-dialog",
        open: isVisible ? 'open' : false
      }, React.createElement("div", {
        className: "dialog__content"
      }, React.createElement(ConsentNotice, props)));
    }
  }]);

  return ConsentNoticeWrapper;
}(React.Component);

export { ConsentNoticeWrapper as default };