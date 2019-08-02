import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import React from 'react';
import { getPurposes } from '../utils/config';
import AppItem from './app-item';

var Apps =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Apps, _React$Component);

  function Apps(props, context) {
    var _this;

    _classCallCheck(this, Apps);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Apps).call(this, props, context));
    props.manager.watch(_assertThisInitialized(_this));
    _this.state = {
      consents: props.manager.consents
    };
    return _this;
  }

  _createClass(Apps, [{
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
        return React.createElement("li", {
          key: "app-".concat(app.name),
          className: ns("apps__list__item apps__list__item--".concat(app.name))
        }, React.createElement(AppItem, _extends({
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
      return React.createElement("div", {
        className: ns('apps')
      }, React.createElement("div", {
        className: ns('apps__toggles')
      }, React.createElement("button", {
        type: "button",
        className: "button button--default",
        disabled: allEnabled,
        onClick: enableAll
      }, t(['acceptAll'])), React.createElement("button", {
        type: "button",
        className: "button button--default",
        disabled: allDisabled,
        onClick: disableAll
      }, t(['declineAll']))), React.createElement("ul", {
        className: ns('apps__list')
      }, appItems));
    }
  }]);

  return Apps;
}(React.Component);

export { Apps as default };