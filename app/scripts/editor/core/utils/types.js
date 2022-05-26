import each from './each';

/**
 * 判断给定的对象是否是字符串
 * @method isString
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是字符串
 */

/**
 * 判断给定的对象是否是数组
 * @method isArray
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是数组
 */

/**
 * 判断给定的对象是否是一个Function
 * @method isFunction
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是Function
 */

/**
 * 判断给定的对象是否是Number
 * @method isNumber
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是Number
 */

/**
 * 判断给定的对象是否是一个正则表达式
 * @method isRegExp
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是正则表达式
 */

/**
 * 判断给定的对象是否是一个普通对象
 * @method isObject
 * @param { * } object 需要判断的对象
 * @return { Boolean } 给定的对象是否是普通对象
 */

const types = {};

each(
  ['String', 'Function', 'Array', 'Number', 'RegExp', 'Object', 'Date'],
  function (v) {
    types['is' + v] = function (obj) {
      return Object.prototype.toString.apply(obj) == '[object ' + v + ']';
    };
  }
);

export const isString = types.isString;
export const isFunction = types.isFunction;
export const isArray = types.isArray;
export const isNumber = types.isNumber;
export const isRegExp = types.isRegExp;
export const isObject = types.isObject;
export const isDate = types.isDate;

export default types;
