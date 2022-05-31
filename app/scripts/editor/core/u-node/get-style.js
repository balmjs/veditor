/**
 * 根据样式名称，获取节点的样式值
 * @method getStyle
 * @param { String } name 要获取的样式名称
 * @return { String } 返回样式值
 * @example
 * ```javascript
 * node.getStyle('font-size');
 * ```
 */
export default function getStyle(name) {
  let cssStyle = this.getAttr('style');
  if (!cssStyle) {
    return '';
  }
  let reg = new RegExp('(^|;)\\s*' + name + ':([^;]+)', 'i');
  let match = cssStyle.match(reg);
  if (match && match[0]) {
    return match[2];
  }
  return '';
}
