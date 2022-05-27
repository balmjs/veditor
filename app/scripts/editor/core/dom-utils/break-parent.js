import remove from './remove';

/**
 * 以node节点为分界，将该节点的指定祖先节点parent拆分成两个独立的节点，
 * 拆分形成的两个节点之间是node节点
 * @method breakParent
 * @param { Node } node 作为分界的节点对象
 * @param { Node } parent 该节点必须是node节点的祖先节点， 且是block节点。
 * @return { Node } 给定的node分界节点
 * @example
 * ```javascript
 *
 *      var node = document.createElement("span"),
 *          wrapNode = document.createElement( "div" ),
 *          parent = document.createElement("p");
 *
 *      parent.appendChild( node );
 *      wrapNode.appendChild( parent );
 *
 *      //拆分前
 *      //output: <p><span></span></p>
 *      console.log( wrapNode.innerHTML );
 *
 *
 *      UE.dom.domUtils.breakParent( node, parent );
 *      //拆分后
 *      //output: <p></p><span></span><p></p>
 *      console.log( wrapNode.innerHTML );
 *
 * ```
 */

export default function (node, parent) {
  let tmpNode,
    parentClone = node,
    clone = node,
    leftNodes,
    rightNodes;
  do {
    parentClone = parentClone.parentNode;
    if (leftNodes) {
      tmpNode = parentClone.cloneNode(false);
      tmpNode.appendChild(leftNodes);
      leftNodes = tmpNode;
      tmpNode = parentClone.cloneNode(false);
      tmpNode.appendChild(rightNodes);
      rightNodes = tmpNode;
    } else {
      leftNodes = parentClone.cloneNode(false);
      rightNodes = leftNodes.cloneNode(false);
    }
    while ((tmpNode = clone.previousSibling)) {
      leftNodes.insertBefore(tmpNode, leftNodes.firstChild);
    }
    while ((tmpNode = clone.nextSibling)) {
      rightNodes.appendChild(tmpNode);
    }
    clone = parentClone;
  } while (parent !== parentClone);
  tmpNode = parent.parentNode;
  tmpNode.insertBefore(leftNodes, parent);
  tmpNode.insertBefore(rightNodes, parent);
  tmpNode.insertBefore(node, rightNodes);
  remove(parent);
  return node;
}
