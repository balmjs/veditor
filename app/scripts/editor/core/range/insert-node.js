/**
 * 在当前选区的开始位置前插入节点，新插入的节点会被该range包含
 * @method  insertNode
 * @param { Node } node 需要插入的节点
 * @remind 插入的节点可以是一个DocumentFragment依次插入多个节点
 * @return { UE.dom.Range } 当前range对象
 */
export default function (node) {
  let first = node,
    length = 1;
  if (node.nodeType == 11) {
    first = node.firstChild;
    length = node.childNodes.length;
  }
  this.trimBoundary(true);
  let start = this.startContainer,
    offset = this.startOffset;
  let nextNode = start.childNodes[offset];
  if (nextNode) {
    start.insertBefore(node, nextNode);
  } else {
    start.appendChild(node);
  }
  if (first.parentNode === this.endContainer) {
    this.endOffset = this.endOffset + length;
  }
  return this.setStartBefore(first);
}
