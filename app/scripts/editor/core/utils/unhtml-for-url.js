/**
 * 将url中的html字符转义， 仅转义  ', ", <, > 四个字符
 * @param  { String } str 需要转义的字符串
 * @param  { RegExp } reg 自定义的正则
 * @return { String }     转义后的字符串
 */
export default function (str, reg) {
  return str
    ? str.replace(reg || /[<">']/g, function (a) {
        return {
          '<': '&lt;',
          '&': '&amp;',
          '"': '&quot;',
          '>': '&gt;',
          "'": '&#39;'
        }[a];
      })
    : '';
}
