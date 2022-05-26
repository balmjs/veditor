/**
 * 将str中的html符号转义,将转义“'，&，<，"，>”五个字符
 * @method unhtml
 * @param { String } str 需要转义的字符串
 * @return { String } 转义后的字符串
 * @example
 * ```javascript
 * var html = '<body>&</body>';
 *
 * //output: &lt;body&gt;&amp;&lt;/body&gt;
 * console.log( UE.utils.unhtml( html ) );
 *
 * ```
 */
export default function (str, reg) {
  return str
    ? str.replace(
        reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g,
        function (a, b) {
          if (b) {
            return a;
          } else {
            return {
              '<': '&lt;',
              '&': '&amp;',
              '"': '&quot;',
              '>': '&gt;',
              "'": '&#39;'
            }[a];
          }
        }
      )
    : '';
}
