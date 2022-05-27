/**
 * 检测节点node在父节点中的索引位置
 * @method getNodeIndex
 * @param { Node } node 需要检测的节点对象
 * @return { Number } 该节点在父节点中的位置
 * @see UE.dom.domUtils.getNodeIndex(Node,Boolean)
 */

/**
 * 检测节点node在父节点中的索引位置， 根据给定的mergeTextNode参数决定是否要合并多个连续的文本节点为一个节点
 * @method getNodeIndex
 * @param { Node } node 需要检测的节点对象
 * @param { Boolean } mergeTextNode 是否合并多个连续的文本节点为一个节点
 * @return { Number } 该节点在父节点中的位置
 * @example
 * ```javascript
 *
 *      var node = document.createElement("div");
 *
 *      node.appendChild( document.createTextNode( "hello" ) );
 *      node.appendChild( document.createTextNode( "world" ) );
 *      node.appendChild( node = document.createElement( "div" ) );
 *
 *      //output: 2
 *      console.log( UE.dom.domUtils.getNodeIndex( node ) );
 *
 *      //output: 1
 *      console.log( UE.dom.domUtils.getNodeIndex( node, true ) );
 *
 * ```
 */
export default function (node, ignoreTextNode) {
  let preNode = node,
    i = 0;
  while ((preNode = preNode.previousSibling)) {
    if (ignoreTextNode && preNode.nodeType == 3) {
      if (preNode.nodeType != preNode.nextSibling.nodeType) {
        i++;
      }
      continue;
    }
    i++;
  }
  return i;
}
