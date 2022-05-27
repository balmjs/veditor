import getPosition from './get-position';

/**
 * 检测节点node是否在给定的document对象上
 * @method inDoc
 * @param { Node } node 需要检测的节点对象
 * @param { DomDocument } doc 需要检测的document对象
 * @return { Boolean } 该节点node是否在给定的document的dom树上
 * @example
 * ```javascript
 *
 * var node = document.createElement("div");
 *
 * //output: false
 * console.log( UE.do.domUtils.inDoc( node, document ) );
 *
 * document.body.appendChild( node );
 *
 * //output: true
 * console.log( UE.do.domUtils.inDoc( node, document ) );
 *
 * ```
 */
export default function (node, doc) {
  return getPosition(node, doc) == 10;
}
