/**
 * 将css样式转换为驼峰的形式
 * @method cssStyleToDomStyle
 * @param { String } cssName 需要转换的css样式名
 * @return { String } 转换成驼峰形式后的css样式名
 * @example
 * ```javascript
 *
 * var str = 'border-top';
 *
 * //output: borderTop
 * console.log( UE.utils.cssStyleToDomStyle( str ) );
 *
 * ```
 */

let test = document.createElement('div').style;
let cache = {
  float:
    test.cssFloat != undefined
      ? 'cssFloat'
      : test.styleFloat != undefined
      ? 'styleFloat'
      : 'float'
};

export default function (cssName) {
  return (
    cache[cssName] ||
    (cache[cssName] = cssName.toLowerCase().replace(/-./g, function (match) {
      return match.charAt(1).toUpperCase();
    }))
  );
}
