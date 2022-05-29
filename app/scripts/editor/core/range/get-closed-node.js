import selectOneNode from './select-one-node';
import dtd from '../dtd';

/**
 * 获取当前选中的自闭合的节点
 * @method  getClosedNode
 * @return { Node | NULL } 如果当前选中的是自闭合节点， 则返回该节点， 否则返回NULL
 */

export default function () {
  let node;
  if (!this.collapsed) {
    var range = this.cloneRange().adjustmentBoundary().shrinkBoundary();
    if (selectOneNode(range)) {
      var child = range.startContainer.childNodes[range.startOffset];
      if (
        child &&
        child.nodeType == 1 &&
        (dtd.$empty[child.tagName] || dtd.$nonChild[child.tagName])
      ) {
        node = child;
      }
    }
  }
  return node;
}
