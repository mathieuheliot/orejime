import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React from 'react';

var AppItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AppItem, _React$Component);

  function AppItem() {
    _classCallCheck(this, AppItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(AppItem).apply(this, arguments));
  }

  _createClass(AppItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          checked = _this$props.checked,
          onToggle = _this$props.onToggle,
          name = _this$props.name,
          title = _this$props.title,
          description = _this$props.description,
          t = _this$props.t,
          ns = _this$props.ns;
      var required = this.props.required || false;
      var optOut = this.props.optOut || false;
      var purposes = this.props.purposes || [];

      var onChange = function onChange(e) {
        onToggle(e.target.checked);
      };

      var id = "orejime-app-item-".concat(name);
      var isChecked = checked || required;
      var purposesText = purposes.map(function (purpose) {
        return t(['purposes', purpose]);
      }).join(", ");
      var optOutText = optOut ? React.createElement("span", {
        className: ns('AppItem-optOut'),
        title: t(['app', 'optOut', 'description'])
      }, t(['app', 'optOut', 'title'])) : '';
      var requiredText = required ? React.createElement("span", {
        className: ns('AppItem-required'),
        title: t(['app', 'required', 'description'])
      }, t(['app', 'required', 'title'])) : '';
      var purposesEl = purposes.length > 0 ? React.createElement("p", {
        className: ns('AppItem-purposes')
      }, t(['app', purposes.length > 1 ? 'purposes' : 'purpose']), ": ", purposesText) : null;
      var switchLabel = isChecked ? 'enabled' : 'disabled';
      return React.createElement("div", {
        className: ns('AppItem')
      }, React.createElement("input", {
        id: id,
        className: ns('AppItem-input'),
        "aria-describedby": "".concat(id, "-description"),
        disabled: required,
        checked: isChecked,
        type: "checkbox",
        onChange: onChange
      }), React.createElement("label", _extends({
        htmlFor: id,
        className: ns('AppItem-label')
      }, required ? {
        tabIndex: "0"
      } : {}), React.createElement("span", {
        className: ns('AppItem-title')
      }, title), requiredText, optOutText, React.createElement("span", {
        className: ns("AppItem-switch ".concat(required ? 'AppItem-switch--disabled' : ''))
      }, React.createElement("div", {
        className: ns('AppItem-slider')
      }), React.createElement("div", {
        "aria-hidden": "true",
        className: ns('AppItem-switchLabel')
      }, t(switchLabel)))), React.createElement("div", {
        id: "".concat(id, "-description"),
        className: ns('AppItem-fullDescription')
      }, React.createElement("p", {
        className: ns('AppItem-description')
      }, description || t([name, 'description'])), purposesEl));
    }
  }]);

  return AppItem;
}(React.Component);

export { AppItem as default };