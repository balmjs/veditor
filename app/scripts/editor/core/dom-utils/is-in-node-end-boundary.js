/**
 * 查询给定的range选区是否在给定的node节点内，且在该节点的最末尾
 * @method isInNodeEndBoundary
 * @param { UE.dom.Range } rng 需要判断的range对象， 该对象的startContainer不能为NULL
 * @param node 需要检测的节点对象
 * @return { Number } 如果给定的选取range对象是在node内部的最末端， 则返回1, 否则返回0
 */

export default function (rng, node) {
  var start = rng.startContainer;
  if (start.nodeType == 3 && rng.startOffset != start.nodeValue.length) {
    return 0;
  }
  if (start.nodeType == 1 && rng.startOffset != start.childNodes.length) {
    return 0;
  }
  while (start !== node) {
    if (start.nextSibling) {
      return 0;
    }
    start = start.parentNode;
  }
  return 1;
}
