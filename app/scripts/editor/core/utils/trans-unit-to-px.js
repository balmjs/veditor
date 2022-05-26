/**
 * 把cm／pt为单位的值转换为px为单位的值
 * @method transUnitToPx
 * @param { String } 待转换的带单位的字符串
 * @return { String } 转换为px为计量单位的值的字符串
 * @example
 * ```javascript
 *
 * //output: 500px
 * console.log( UE.utils.transUnitToPx( '20cm' ) );
 *
 * //output: 27px
 * console.log( UE.utils.transUnitToPx( '20pt' ) );
 *
 * ```
 */

export default function (val) {
  if (!/(pt|cm)/.test(val)) {
    return val;
  }
  let unit;
  val.replace(/([\d.]+)(\w+)/, function (str, v, u) {
    val = v;
    unit = u;
  });
  switch (unit) {
    case 'cm':
      val = parseFloat(val) * 25;
      break;
    case 'pt':
      val = Math.round((parseFloat(val) * 96) / 72);
  }
  return val + (val ? 'px' : '');
}
