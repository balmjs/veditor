/**
 * 删除字符串str的首尾空格
 * @method trim
 * @param { String } str 需要删除首尾空格的字符串
 * @return { String } 删除了首尾的空格后的字符串
 * @example
 * ```javascript
 *
 * var str = " UEdtior ";
 *
 * //output: 9
 * console.log( str.length );
 *
 * //output: 7
 * console.log( UE.utils.trim( " UEdtior " ).length );
 *
 * //output: 9
 * console.log( str.length );
 *
 *  ```
 */

export default function (str) {
  return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
}
