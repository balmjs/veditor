import types from './types';

const encodeString = function (source) {
  if (/["\\\x00-\x1f]/.test(source)) {
    source = source.replace(/["\\\x00-\x1f]/g, function (match) {
      let c = escapeMap[match];
      if (c) {
        return c;
      }
      c = match.charCodeAt();
      return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
    });
  }
  return '"' + source + '"';
};

const encodeArray = function (source) {
  let result = ['['],
    l = source.length,
    preComma,
    i,
    item;

  for (i = 0; i < l; i++) {
    item = source[i];

    switch (typeof item) {
      case 'undefined':
      case 'function':
      case 'unknown':
        break;
      default:
        if (preComma) {
          result.push(',');
        }
        result.push(json2str(item));
        preComma = 1;
    }
  }
  result.push(']');
  return result.join('');
};

const pad = function (source) {
  return source < 10 ? '0' + source : source;
};

const encodeDate = function (source) {
  return (
    '"' +
    source.getFullYear() +
    '-' +
    pad(source.getMonth() + 1) +
    '-' +
    pad(source.getDate()) +
    'T' +
    pad(source.getHours()) +
    ':' +
    pad(source.getMinutes()) +
    ':' +
    pad(source.getSeconds()) +
    '"'
  );
};

const json2str = function (value) {
  if (window.JSON) {
    return JSON.stringify;
  }
  switch (typeof value) {
    case 'undefined':
      return 'undefined';

    case 'number':
      return isFinite(value) ? String(value) : 'null';

    case 'string':
      return encodeString(value);

    case 'boolean':
      return String(value);

    default:
      if (value === null) {
        return 'null';
      } else if (types.isArray(value)) {
        return encodeArray(value);
      } else if (types.isDate(value)) {
        return encodeDate(value);
      } else {
        var result = ['{'],
          encode = json2str,
          preComma,
          item;

        for (var key in value) {
          if (Object.prototype.hasOwnProperty.call(value, key)) {
            item = value[key];
            switch (typeof item) {
              case 'undefined':
              case 'unknown':
              case 'function':
                break;
              default:
                if (preComma) {
                  result.push(',');
                }
                preComma = 1;
                result.push(encode(key) + ':' + encode(item));
            }
          }
        }
        result.push('}');
        return result.join('');
      }
  }
};

export default json2str;
