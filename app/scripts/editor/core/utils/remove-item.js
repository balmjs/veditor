/**
 * 移除数组array中所有的元素item
 * @method removeItem
 * @param { Array } array 要移除元素的目标数组
 * @param { * } item 将要被移除的元素
 * @remind 该方法的匹配过程使用的是恒等“===”
 * @example
 * ```javascript
 * var arr = [ 4, 5, 7, 1, 3, 4, 6 ];
 *
 * UE.utils.removeItem( arr, 4 );
 * //output: [ 5, 7, 1, 3, 6 ]
 * console.log( arr );
 *
 * ```
 */

export default function (array, item) {
  for (let i = 0, l = array.length; i < l; i++) {
    if (array[i] === item) {
      array.splice(i, 1);
      i--;
    }
  }
}
