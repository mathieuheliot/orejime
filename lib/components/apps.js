"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _config = require("../utils/config");

var _appItem = _interopRequireDefault(require("./app-item"));

var Apps =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Apps, _React$Component);

  function Apps(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, Apps);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Apps).call(this, props, context));
    props.manager.watch((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      consents: props.manager.consents
    };
    return _this;
  }

  (0, _createClass2.default)(Apps, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var manager = this.props.manager;
      manager.unwatch(this);
    }
  }, {
    key: "update",
    value: function update(obj, type, data) {
      var manager = this.props.manager;
      if (obj == manager && type == 'consents') this.setState({
        consents: data
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          t = _this$props.t,
          ns = _this$props.ns,
          manager = _this$props.manager;
      var consents = this.state.consents;
      var apps = config.apps;

      var toggle = function toggle(apps, value) {
        apps.map(function (app) {
          manager.updateConsent(app, value);
        });
      };

      var toggleAll = function toggleAll(value) {
        toggle(apps, value);
      };

      var enableAll = function enableAll() {
        return toggleAll(true);
      };

      var disableAll = function disableAll() {
        return toggleAll(false);
      };

      var appItems = apps.map(function (app, key) {
        var toggleApp = function toggleApp(value) {
          toggle([app], value);
        };

        var checked = consents[app.name];
        return _react.default.createElement("li", {
          key: "app-".concat(app.name),
          className: ns("AppList-item AppList-item--".concat(app.name))
        }, _react.default.createElement(_appItem.default, (0, _extends2.default)({
          checked: checked || app.required,
          onToggle: toggleApp,
          t: t,
          ns: ns
        }, app)));
      });
      var allDisabled = apps.filter(function (app) {
        return app.required || false ? false : consents[app.name];
      }).length === 0;
      var allEnabled = apps.filter(function (app) {
        return consents[app.name];
      }).length === apps.length;
      return _react.default.createElement("div", null, _react.default.createElement("div", {
        className: ns('AppToggles')
      }, _react.default.createElement("button", {
        type: "button",
        className: ns('Button Button--info AppToggles-button AppToggles-enableAll'),
        disabled: allEnabled,
        onClick: enableAll
      }, t(['acceptAll'])), _react.default.createElement("button", {
        type: "button",
        className: ns('Button Button--info AppToggles-button AppToggles-disableAll'),
        disabled: allDisabled,
        onClick: disableAll
      }, t(['declineAll']))), _react.default.createElement("ul", {
        className: ns('AppList')
      }, appItems));
    }
  }]);
  return Apps;
}(_react.default.Component);

exports.default = Apps;