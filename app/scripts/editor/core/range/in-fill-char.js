import domUtils from '../dom-utils';

/**
 * 判断当前选区内容是否占位符
 * @private
 * @method inFillChar
 * @return { Boolean } 如果是占位符返回true，否则返回false
 */

export default function () {
  let start = this.startContainer;
  if (
    this.collapsed &&
    start.nodeType == 3 &&
    start.nodeValue.replace(new RegExp('^' + domUtils.fillChar), '').length +
      1 ==
      start.nodeValue.length
  ) {
    return true;
  }
  return false;
}
