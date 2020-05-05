import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React from 'react';
import ConsentNoticeWrapper from './consent-notice-wrapper';
import ConsentModal from './consent-modal';

var Main = /*#__PURE__*/function (_React$Component) {
  _inherits(Main, _React$Component);

  var _super = _createSuper(Main);

  function Main(props) {
    var _this;

    _classCallCheck(this, Main);

    _this = _super.call(this, props);
    _this.state = {
      isModalVisible: _this.isModalVisible()
    };
    _this.showModal = _this.showModal.bind(_assertThisInitialized(_this));
    _this.hideModal = _this.hideModal.bind(_assertThisInitialized(_this));
    _this.saveAndHideAll = _this.saveAndHideAll.bind(_assertThisInitialized(_this));
    _this.declineAndHideAll = _this.declineAndHideAll.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Main, [{
    key: "isModalVisible",
    value: function isModalVisible(userRequest) {
      var _this$props = this.props,
          config = _this$props.config,
          manager = _this$props.manager;

      if (userRequest) {
        return true;
      }

      if (config.mustConsent && (!manager.confirmed || manager.changed)) {
        return true;
      }

      return false;
    }
  }, {
    key: "isNoticeVisible",
    value: function isNoticeVisible() {
      var _this$props2 = this.props,
          config = _this$props2.config,
          manager = _this$props2.manager;

      if (config.mustConsent || config.noNotice) {
        return false;
      }

      if (manager.confirmed && !manager.changed) {
        return false;
      }

      return true;
    }
  }, {
    key: "showModal",
    value: function showModal(e) {
      if (e !== undefined) {
        e.preventDefault();
      }

      this.setState({
        isModalVisible: this.isModalVisible(true)
      });
    }
  }, {
    key: "hideModal",
    value: function hideModal(e) {
      if (e !== undefined) {
        e.preventDefault();
      }

      this.setState({
        isModalVisible: this.isModalVisible(false)
      });
    }
  }, {
    key: "saveAndHideAll",
    value: function saveAndHideAll(e) {
      if (e !== undefined) {
        e.preventDefault();
      }

      this.props.manager.saveAndApplyConsents();
      this.setState({
        isModalVisible: this.isModalVisible(false)
      });
    }
  }, {
    key: "declineAndHideAll",
    value: function declineAndHideAll(e) {
      this.props.manager.declineAll();
      this.props.manager.saveAndApplyConsents();
      this.setState({
        isModalVisible: this.isModalVisible(false)
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          config = _this$props3.config,
          t = _this$props3.t,
          manager = _this$props3.manager,
          ns = _this$props3.ns;
      var isNoticeVisible = this.isNoticeVisible();
      return React.createElement("div", {
        className: ns('Main')
      }, React.createElement(ConsentNoticeWrapper, {
        key: "notice",
        t: t,
        ns: ns,
        isVisible: isNoticeVisible,
        isMandatory: config.mustNotice || false,
        isModalVisible: this.state.isModalVisible,
        config: config,
        manager: manager,
        onSaveRequest: this.saveAndHideAll,
        onDeclineRequest: this.declineAndHideAll,
        onConfigRequest: this.showModal
      }), React.createElement(ConsentModal, {
        key: "modal",
        isOpen: this.state.isModalVisible,
        t: t,
        ns: ns,
        config: config,
        onHideRequest: this.hideModal,
        onSaveRequest: this.saveAndHideAll,
        manager: manager
      }));
    }
  }]);

  return Main;
}(React.Component);

export { Main as default };