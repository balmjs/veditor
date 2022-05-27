import browser from '../browser';
import fillChar from './fill-char';

/**
 * 用“填充字符”填充节点
 * @method fillNode
 * @private
 * @param { DomDocument } doc 填充的节点所在的docment对象
 * @param { Node } node 需要填充的节点对象
 * @example
 * ```html
 * <div id="test"></div>
 *
 * <script>
 *     var testNode = document.getElementById("test");
 *
 *     //output: 0
 *     console.log( testNode.childNodes.length );
 *
 *     UE.dom.domUtils.fillNode( document, testNode );
 *
 *     //output: 1
 *     console.log( testNode.childNodes.length );
 *
 * </script>
 * ```
 */
export default function (doc, node) {
  let tmpNode = browser.ie
    ? doc.createTextNode(fillChar)
    : doc.createElement('br');
  node.innerHTML = '';
  node.appendChild(tmpNode);
}
