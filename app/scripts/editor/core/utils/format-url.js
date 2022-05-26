export default function (url) {
  var u = url.replace(/&&/g, '&');
  u = u.replace(/\?&/g, '?');
  u = u.replace(/&$/g, '');
  u = u.replace(/&#/g, '#');
  u = u.replace(/&+/g, '&');
  return u;
}
