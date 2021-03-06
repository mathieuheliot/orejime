import React from 'react';
import { render } from 'react-dom';
import ConsentManager from './consent-manager';
import translations from './translations';
import Main from './components/main';
import { convertToMap, update } from './utils/maps';
import { t, language } from './utils/i18n';
import { createCssNamespace } from './utils/css';

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
  update(trans, convertToMap(translations));
  update(trans, convertToMap(config.translations));
  return trans;
}

var managers = {};

function getManager(config) {
  var name = config.elementID;
  if (managers[name] === undefined) managers[name] = new ConsentManager(config);
  return managers[name];
}

export var defaultConfig = {
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
  lang: language(),
  translations: {},
  apps: {},
  debug: false
};
export function init(conf) {
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

    return t.apply(void 0, [trans, config.lang, config.debug].concat(args));
  };

  var app = render(React.createElement(Main, {
    t: tt,
    ns: createCssNamespace(config.stylePrefix),
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
export default {
  init: init,
  defaultConfig: defaultConfig
};