import types from './types';
import trim from './trim';

export default function (s) {
  if (!types.isString(s)) return null;
  if (window.JSON) {
    return JSON.parse(s);
  } else {
    return new Function('return ' + trim(s || ''))();
  }
}
