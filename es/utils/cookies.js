export function getCookies() {
  var cookieStrings = document.cookie.split(";");
  var cookies = [];
  var regex = new RegExp('^\\s*([^=]+)\\s*\=\\s*(.*?)$');

  for (var i = 0; i < cookieStrings.length; i++) {
    var cookieStr = cookieStrings[i];
    var match = regex.exec(cookieStr);
    if (match === null) continue;
    cookies.push({
      name: match[1],
      value: match[2]
    });
  }

  return cookies;
}
export function getCookie(name) {
  var cookies = getCookies();

  for (var i = 0; i < cookies.length; i++) {
    if (cookies[i].name == name) return cookies[i];
  }

  return null;
} //https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript

export function setCookie(name, value, days) {
  var expires = "";

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function deleteCookie(name, path, domain) {
  var cookieString = "".concat(name, "=; Max-Age=-99999999;").concat(path !== undefined ? " path=".concat(path, ";") : " path=/;");

  if (domain !== undefined) {
    document.cookie = "".concat(cookieString, " domain=").concat(domain, ";");
    return;
  } // if domain is not defined, try to delete cookie on multiple default domains


  document.cookie = cookieString;
  document.cookie = "".concat(cookieString, " domain=.").concat(location.hostname, ";"); // handle subdomains

  document.cookie = "".concat(cookieString, " domain=.").concat(location.hostname.split('.').slice(-2).join('.'), ";");
}