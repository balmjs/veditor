import fillChar from './fill-char';

/**
 * 判断给定的节点是否是一个“填充”节点
 * @private
 * @method isFillChar
 * @param { Node } node 需要判断的节点
 * @param { Boolean } isInStart 是否从节点内容的开始位置匹配
 * @returns { Boolean } 节点是否是填充节点
 */
export default function (node, isInStart) {
  if (node.nodeType != 3) return false;
  let text = node.nodeValue;
  if (isInStart) {
    return new RegExp('^' + fillChar).test(text);
  }
  return !text.replace(new RegExp(fillChar, 'g'), '').length;
}
