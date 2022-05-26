import each from './each';
import types from './types';

/**
 * 获取元素item在数组array中首次出现的位置, 如果未找到item， 则返回-1
 * @method indexOf
 * @remind 该方法的匹配过程使用的是恒等“===”
 * @param { Array } array 需要查找的数组对象
 * @param { * } item 需要在目标数组中查找的值
 * @return { int } 返回item在目标数组array中首次出现的位置， 如果在数组中未找到item， 则返回-1
 * @example
 * ```javascript
 * var item = 1,
 *     arr = [ 3, 4, 6, 8, 1, 1, 2 ];
 *
 * //output: 4
 * console.log( UE.utils.indexOf( arr, item ) );
 * ```
 */

/**
 * 获取元素item数组array中首次出现的位置, 如果未找到item， 则返回-1。通过start的值可以指定搜索的起始位置。
 * @method indexOf
 * @remind 该方法的匹配过程使用的是恒等“===”
 * @param { Array } array 需要查找的数组对象
 * @param { * } item 需要在目标数组中查找的值
 * @param { int } start 搜索的起始位置
 * @return { int } 返回item在目标数组array中的start位置之后首次出现的位置， 如果在数组中未找到item， 则返回-1
 * @example
 * ```javascript
 * var item = 1,
 *     arr = [ 3, 4, 6, 8, 1, 2, 8, 3, 2, 1, 1, 4 ];
 *
 * //output: 9
 * console.log( UE.utils.indexOf( arr, item, 5 ) );
 * ```
 */
export default function (array, item, start) {
  let index = -1;
  start = types.isNumber(start) ? start : 0;
  each(array, function (v, i) {
    if (i >= start && v === item) {
      index = i;
      return false;
    }
  });
  return index;
}
