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
import ReactModal from 'react-modal';
import useLegacyLifecycleMethods from '../utils/useLegacyLifecycleMethods';

var Dialog = /*#__PURE__*/function (_React$Component) {
  _inherits(Dialog, _React$Component);

  var _super = _createSuper(Dialog);

  function Dialog(props) {
    var _this;

    _classCallCheck(this, Dialog);

    _this = _super.call(this);

    if (props.config.appElement) {
      ReactModal.setAppElement(props.config.appElement);
    }

    _this.scrollPosition = null; // handle lifecycle methods depending on react version for full support

    if (useLegacyLifecycleMethods()) {
      _this.componentWillUpdate = _this.componentWillUpdateLifecycle;
    } else {
      _this.getSnapshotBeforeUpdate = _this.getSnapshotBeforeUpdateLifecycle;
    }

    return _this;
  } // for react <16.3 support - see constructor


  _createClass(Dialog, [{
    key: "componentWillUpdateLifecycle",
    value: function componentWillUpdateLifecycle(nextProps) {
      var willOpen = nextProps.isOpen;

      if (willOpen && !this.props.isOpen) {
        this.scrollPosition = window.pageYOffset;
      }
    } // for react >= 16.3 support - see constructor

  }, {
    key: "getSnapshotBeforeUpdateLifecycle",
    value: function getSnapshotBeforeUpdateLifecycle(prevProps) {
      var isOpen = this.props.isOpen;

      if (isOpen && !prevProps.isOpen) {
        this.scrollPosition = window.pageYOffset;
      }

      return null;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      var isOpen = this.props.isOpen;

      if (!isOpen && prevProps.isOpen && this.props.handleScrollPosition && this.scrollPosition !== null) {
        // the scroll position stuff is for iOS to work correctly when we want to prevent normal website
        // scrolling with the modal opened
        //
        // /!\ this requires specific CSS to work, example if `htmlOpenClassName = modal-open`:
        //
        // .modal-open {
        //   height: 100%;
        // }
        // .modal-open body {
        //   position: fixed;
        //   overflow: hidden;
        //   height: 100%;
        //   width: 100%;
        // }
        setTimeout(function () {
          //setTimeout because it seems there is a race condition of some sort without it… oh well
          window.scrollTo(window.pageXOffset, _this2.scrollPosition);
          _this2.scrollPosition = null;
        }, 0);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          appElement = _this$props.appElement,
          handleScrollPosition = _this$props.handleScrollPosition,
          config = _this$props.config,
          reactModalProps = _objectWithoutProperties(_this$props, ["children", "appElement", "handleScrollPosition", "config"]);

      return React.createElement(ReactModal, _extends({
        parentSelector: function parentSelector() {
          return document.getElementById(config.elementID || 'orejime');
        },
        htmlOpenClassName: "modal-opened"
      }, reactModalProps), children);
    }
  }]);

  return Dialog;
}(React.Component);

export { Dialog as default };
Dialog.defaultProps = {
  handleScrollPosition: true
};