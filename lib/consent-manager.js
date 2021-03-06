"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _cookies = require("./utils/cookies");

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var ConsentManager = /*#__PURE__*/function () {
  function ConsentManager(config) {
    (0, _classCallCheck2.default)(this, ConsentManager);
    this.config = config; // the configuration

    this.consents = this.defaultConsents; // the consent states of the configured apps

    this.confirmed = false; // true if the user actively confirmed his/her consent

    this.changed = false; // true if the app config changed compared to the cookie

    this.states = {}; // keep track of the change (enabled, disabled) of individual apps

    this.executedOnce = {}; //keep track of which apps have been executed at least once

    this.watchers = new Set([]);
    this.loadConsents();

    if (this.hasImplicitConsent()) {
      this.saveAndApplyConsents();
    } else {
      this.applyConsents();
    }
  }

  (0, _createClass2.default)(ConsentManager, [{
    key: "watch",
    value: function watch(watcher) {
      if (!this.watchers.has(watcher)) this.watchers.add(watcher);
    }
  }, {
    key: "unwatch",
    value: function unwatch(watcher) {
      if (this.watchers.has(watcher)) this.watchers.delete(watcher);
    }
  }, {
    key: "notify",
    value: function notify(name, data) {
      var _this = this;

      this.watchers.forEach(function (watcher) {
        watcher.update(_this, name, data);
      });
    }
  }, {
    key: "getApp",
    value: function getApp(name) {
      var matchingApps = this.config.apps.filter(function (app) {
        return app.name == name;
      });
      if (matchingApps.length > 0) return matchingApps[0];
      return undefined;
    }
  }, {
    key: "getDefaultConsent",
    value: function getDefaultConsent(app) {
      var consent = app.default;
      if (consent === undefined) consent = this.config.default;
      if (consent === undefined) consent = false;
      return consent;
    }
  }, {
    key: "declineAll",
    value: function declineAll() {
      var _this2 = this;

      this.config.apps.map(function (app) {
        _this2.updateConsent(app, false);
      });
    }
  }, {
    key: "updateConsent",
    value: function updateConsent(app, value) {
      if (app.required && !value) {
        return;
      }

      this.consents[app.name] = value;
      this.notify('consents', this.consents);
    }
  }, {
    key: "resetConsent",
    value: function resetConsent() {
      this.consents = this.defaultConsents;
      this.confirmed = false;
      this.applyConsents();
      (0, _cookies.deleteCookie)(this.cookieName);
      this.notify('consents', this.consents);
    }
  }, {
    key: "getConsent",
    value: function getConsent(name) {
      return this.consents[name] || false;
    }
  }, {
    key: "_checkConsents",
    value: function _checkConsents() {
      var complete = true;
      var appNames = this.config.apps.map(function (app) {
        return app.name;
      });
      Object.keys(this.consents).forEach(function (key) {
        if (appNames.indexOf(key) === -1) {
          delete this.consents[key];
        }
      }.bind(this));
      this.config.apps.forEach(function (app) {
        if (typeof this.consents[app.name] === 'undefined') {
          this.consents[app.name] = this.getDefaultConsent(app);
          complete = false;
        }
      }.bind(this));
      this.confirmed = complete;
      if (!complete) this.changed = true;
    }
  }, {
    key: "hasImplicitConsent",
    value: function hasImplicitConsent() {
      if (this.confirmed) {
        return false;
      }

      var enableImplicitConsent = typeof this.config.implicitConsent !== 'undefined' ? this.config.implicitConsent : false;

      if (!enableImplicitConsent) {
        return false;
      }

      var currentHost = document.location.hostname;
      var referrerHost = document.referrer.split('/')[2];
      var isFirstVisit = currentHost !== referrerHost;

      if (isFirstVisit) {
        return false;
      }

      return true;
    }
  }, {
    key: "loadConsents",
    value: function loadConsents() {
      var consentCookie = (0, _cookies.getCookie)(this.cookieName);

      if (consentCookie !== null && consentCookie.value !== '') {
        this.consents = JSON.parse(consentCookie.value);

        this._checkConsents();

        this.notify('consents', this.consents);
      }

      return this.consents;
    }
  }, {
    key: "saveAndApplyConsents",
    value: function saveAndApplyConsents() {
      this.saveConsents();
      this.applyConsents();
    }
  }, {
    key: "saveConsents",
    value: function saveConsents() {
      if (this.consents === null) (0, _cookies.deleteCookie)(this.cookieName);
      var v = JSON.stringify(this.consents);
      (0, _cookies.setCookie)(this.cookieName, v, this.config.cookieExpiresAfterDays || 120);
      this.confirmed = true;
      this.changed = false;
    }
  }, {
    key: "applyConsents",
    value: function applyConsents() {
      for (var i = 0; i < this.config.apps.length; i++) {
        var app = this.config.apps[i];
        var state = this.states[app.name];
        var confirmed = this.confirmed || (app.optOut !== undefined ? app.optOut : this.config.optOut || false);
        var consent = this.getConsent(app.name) && confirmed;
        if (state === consent) continue;
        this.updateAppElements(app, consent);
        this.updateAppCookies(app, consent);
        if (app.callback !== undefined) app.callback(consent, app);
        this.states[app.name] = consent;
      }
    }
  }, {
    key: "updateAppElements",
    value: function updateAppElements(app, consent) {
      // we make sure we execute this app only once if the option is set
      if (consent) {
        if (app.onlyOnce && this.executedOnce[app.name]) return;
        this.executedOnce[app.name] = true;
      }

      var elements = document.querySelectorAll("[data-name='" + app.name + "']");

      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var parent = element.parentElement;
        var dataset = element.dataset;
        var type = dataset.type,
            name = dataset.name;
        var attrs = ['href', 'src']; //if no consent was given we disable this tracker
        //we remove and add it again to trigger a re-execution

        if (element.tagName == 'SCRIPT') {
          // we create a new script instead of updating the node in
          // place, as the script won't start correctly otherwise
          var newElement = document.createElement('script');

          for (var _i = 0, _Object$keys = Object.keys(dataset); _i < _Object$keys.length; _i++) {
            var key = _Object$keys[_i];
            newElement.dataset[key] = dataset[key];
          }

          newElement.type = 'opt-in';
          newElement.innerText = element.innerText;
          newElement.text = element.text;
          newElement.class = element.class;
          newElement.style.cssText = element.style;
          newElement.id = element.id;
          newElement.name = element.name;
          newElement.defer = element.defer;
          newElement.async = element.async;

          if (consent) {
            newElement.type = type;
            if (dataset.src !== undefined) newElement.src = dataset.src;
          } //we remove the original element and insert a new one


          parent.insertBefore(newElement, element);
          parent.removeChild(element);
        } else {
          // all other elements (images etc.) are modified in place...
          if (consent) {
            var _iterator = _createForOfIteratorHelper(attrs),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var attr = _step.value;
                var attrValue = dataset[attr];
                if (attrValue === undefined) continue;
                if (dataset['original' + attr] === undefined) dataset['original' + attr] = element[attr];
                element[attr] = attrValue;
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            if (dataset.title !== undefined) element.title = dataset.title;
            if (dataset.originalDisplay !== undefined) element.style.display = dataset.originalDisplay;
          } else {
            if (dataset.title !== undefined) element.removeAttribute('title');

            if (dataset.hide === "true") {
              if (dataset.originalDisplay === undefined) dataset.originalDisplay = element.style.display;
              element.style.display = 'none';
            }

            var _iterator2 = _createForOfIteratorHelper(attrs),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var attr = _step2.value;
                var _attrValue = dataset[attr];
                if (_attrValue === undefined) continue;
                if (dataset['original' + attr] !== undefined) element[attr] = dataset['original' + attr];
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        }
      }
    }
  }, {
    key: "updateAppCookies",
    value: function updateAppCookies(app, consent) {
      if (consent) return;

      function escapeRegexStr(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      }

      if (app.cookies !== undefined && app.cookies.length > 0) {
        var cookies = (0, _cookies.getCookies)();

        for (var i = 0; i < app.cookies.length; i++) {
          var cookiePattern = app.cookies[i];
          var cookiePath = void 0,
              cookieDomain = void 0;

          if (cookiePattern instanceof Array) {
            var _cookiePattern = cookiePattern;

            var _cookiePattern2 = (0, _slicedToArray2.default)(_cookiePattern, 3);

            cookiePattern = _cookiePattern2[0];
            cookiePath = _cookiePattern2[1];
            cookieDomain = _cookiePattern2[2];
          }

          if (!(cookiePattern instanceof RegExp)) {
            cookiePattern = new RegExp('^' + escapeRegexStr(cookiePattern) + '$');
          }

          for (var j = 0; j < cookies.length; j++) {
            var cookie = cookies[j];
            var match = cookiePattern.exec(cookie.name);

            if (match !== null) {
              (0, _cookies.deleteCookie)(cookie.name, cookiePath, cookieDomain);
            }
          }
        }
      }
    }
  }, {
    key: "cookieName",
    get: function get() {
      return this.config.cookieName || 'orejime';
    }
  }, {
    key: "defaultConsents",
    get: function get() {
      var consents = {};

      for (var i = 0; i < this.config.apps.length; i++) {
        var app = this.config.apps[i];
        consents[app.name] = this.getDefaultConsent(app);
      }

      return consents;
    }
  }]);
  return ConsentManager;
}();

exports.default = ConsentManager;