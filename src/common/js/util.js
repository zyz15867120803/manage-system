let CookieUtil = {};

CookieUtil.get = function (name) {
  let cookieName = encodeURIComponent(name) + '=';
  let cookieStart = document.cookie.indexOf(cookieName);
  let cookieValue = null;

  if (cookieStart > -1) {
    let cookieEnd = document.cookie.indexOf(';', cookieStart);
    if (cookieEnd === -1) {
      cookieEnd = document.cookie.length;
    }
    cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
  }
  return cookieValue;
};

CookieUtil.set = function (name, value, day = 3) {
  let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
  let expires = new Date();
  expires.setHours(expires.getHours() + (24 * day));

  cookieText += '; expires=' + expires.toUTCString();

  document.cookie = cookieText;
};

CookieUtil.unset = function (name) {
  this.set(name, '', -1);
};

export default CookieUtil;
