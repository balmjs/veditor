/**
 * 把rgb格式的颜色值转换成16进制格式
 * @method fixColor
 * @param { String } rgb格式的颜色值
 * @param { String }
 * @example
 * rgb(255,255,255)  => "#ffffff"
 */

export default function (name, value) {
  if (/color/i.test(name) && /rgba?/.test(value)) {
    let array = value.split(',');
    if (array.length > 3) return '';
    value = '#';
    for (let i = 0, color; (color = array[i++]); ) {
      color = parseInt(color.replace(/[^\d]/gi, ''), 10).toString(16);
      value += color.length == 1 ? '0' + color : color;
    }
    value = value.toUpperCase();
  }
  return value;
}
