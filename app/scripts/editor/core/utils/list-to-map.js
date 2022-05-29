import types from './types';

/**
 * 将字符串str以','分隔成数组后，将该数组转换成哈希对象， 其生成的hash对象的key为数组中的元素， value为1
 * @method listToMap
 * @warning 该方法在生成的hash对象中，会为每一个key同时生成一个另一个全大写的key。
 * @param { String } str 该字符串将被以','分割为数组， 然后进行转化
 * @return { Object } 转化之后的hash对象
 * @example
 * ```javascript
 *
 * //output: Object {UEdtior: 1, UEDTIOR: 1, Hello: 1, HELLO: 1}
 * console.log( UE.utils.listToMap( 'UEdtior,Hello' ) );
 *
 * ```
 */

/**
 * 将字符串数组转换成哈希对象， 其生成的hash对象的key为数组中的元素， value为1
 * @method listToMap
 * @warning 该方法在生成的hash对象中，会为每一个key同时生成一个另一个全大写的key。
 * @param { Array } arr 字符串数组
 * @return { Object } 转化之后的hash对象
 * @example
 * ```javascript
 *
 * //output: Object {UEdtior: 1, UEDTIOR: 1, Hello: 1, HELLO: 1}
 * console.log( UE.utils.listToMap( [ 'UEdtior', 'Hello' ] ) );
 *
 * ```
 */
export default function (list) {
  if (!list) return {};
  list = types.isArray(list) ? list : list.split(',');
  let obj = {};
  for (let i = 0, ci; (ci = list[i++]); ) {
    obj[ci.toUpperCase()] = obj[ci] = 1;
  }
  return obj;
}
