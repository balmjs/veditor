import isWhitespace from './is-whitespace';

/**
 * 删除node节点下首尾两端的空白文本子节点
 * @method trimWhiteTextNode
 * @param { Element } node 需要执行删除操作的元素对象
 * @example
 * ```javascript
 *      var node = document.createElement("div");
 *
 *      node.appendChild( document.createTextNode( "" ) );
 *
 *      node.appendChild( document.createElement("div") );
 *
 *      node.appendChild( document.createTextNode( "" ) );
 *
 *      //3
 *      console.log( node.childNodes.length );
 *
 *      UE.dom.domUtils.trimWhiteTextNode( node );
 *
 *      //1
 *      console.log( node.childNodes.length );
 * ```
 */

export default function (node) {
  function remove(dir) {
    let child;
    while ((child = node[dir]) && child.nodeType == 3 && isWhitespace(child)) {
      node.removeChild(child);
    }
  }
  remove('firstChild');
  remove('lastChild');
}
