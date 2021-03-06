"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.default = exports.defaultConfig = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _consentManager = _interopRequireDefault(require("./consent-manager"));

var _translations = _interopRequireDefault(require("./translations"));

var _main = _interopRequireDefault(require("./components/main"));

var _maps = require("./utils/maps");

var _i18n = require("./utils/i18n");

var _css = require("./utils/css");

function getElement(config) {
  var id = config.elementID,
      stylePrefix = config.stylePrefix;
  var element = document.getElementById(id);

  if (element === null) {
    element = document.createElement('div');
    element.id = id;
    document.body.insertBefore(element, document.body.firstChild);
  }

  var child = document.querySelector(".".concat(stylePrefix, "-AppContainer"));

  if (child === null) {
    child = document.createElement('div');
    child.className = "".concat(stylePrefix, "-AppContainer");
    element.appendChild(child);
  }

  return document.querySelector(".".concat(stylePrefix, "-AppContainer"));
}

function getTranslations(config) {
  var trans = new Map([]);
  (0, _maps.update)(trans, (0, _maps.convertToMap)(_translations.default));
  (0, _maps.update)(trans, (0, _maps.convertToMap)(config.translations));
  return trans;
}

var managers = {};

function getManager(config) {
  var name = config.elementID;
  if (managers[name] === undefined) managers[name] = new _consentManager.default(config);
  return managers[name];
}

var defaultConfig = {
  elementID: 'orejime',
  appElement: undefined,
  stylePrefix: 'orejime',
  cookieName: 'orejime',
  cookieExpiresAfterDays: 365,
  privacyPolicy: '',
  default: true,
  mustConsent: false,
  mustNotice: false,
  implicitConsent: false,
  logo: false,
  lang: (0, _i18n.language)(),
  translations: {},
  apps: {},
  debug: false
};
exports.defaultConfig = defaultConfig;

function init(conf) {
  var config = Object.assign({}, defaultConfig, conf);
  var errors = [];

  if (!Object.keys(config.apps).length) {
    errors.push('  - you must define `apps` to manage');
  }

  if (!config.privacyPolicy.length) {
    errors.push('  - you must define a `privacyPolicy` url');
  }

  if (errors.length) {
    errors.unshift('Orejime config error:');
    console.error(errors.join('\n'));
    return;
  }

  var element = getElement(config);
  var trans = getTranslations(config);
  var manager = getManager(config);

  var tt = function tt() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _i18n.t.apply(void 0, [trans, config.lang, config.debug].concat(args));
  };

  var app = (0, _reactDom.render)(_react.default.createElement(_main.default, {
    t: tt,
    ns: (0, _css.createCssNamespace)(config.stylePrefix),
    manager: manager,
    config: config
  }), element);
  console.log('🍪 User consents manager Orejime launched');
  return {
    show: app.showModal.bind(app),
    internals: {
      react: app,
      manager: manager,
      config: config
    }
  };
}

var _default = {
  init: init,
  defaultConfig: defaultConfig
};
exports.default = _default;