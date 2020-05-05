"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _consentNoticeWrapper = _interopRequireDefault(require("./consent-notice-wrapper"));

var _consentModal = _interopRequireDefault(require("./consent-modal"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Main = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Main, _React$Component);

  var _super = _createSuper(Main);

  function Main(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Main);
    _this = _super.call(this, props);
    _this.state = {
      isModalVisible: _this.isModalVisible()
    };
    _this.showModal = _this.showModal.bind((0, _assertThisInitialized2.default)(_this));
    _this.hideModal = _this.hideModal.bind((0, _assertThisInitialized2.default)(_this));
    _this.saveAndHideAll = _this.saveAndHideAll.bind((0, _assertThisInitialized2.default)(_this));
    _this.declineAndHideAll = _this.declineAndHideAll.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Main, [{
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
      return _react.default.createElement("div", {
        className: ns('Main')
      }, _react.default.createElement(_consentNoticeWrapper.default, {
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
      }), _react.default.createElement(_consentModal.default, {
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
}(_react.default.Component);

exports.default = Main;