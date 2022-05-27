import insertAfter from './insert-after';
import remove from './remove';
import browser from '../browser';

/**
 * 将一个文本节点textNode拆分成两个文本节点，offset指定拆分位置
 * @method split
 * @param { Node } textNode 需要拆分的文本节点对象
 * @param { int } offset 需要拆分的位置， 位置计算从0开始
 * @return { Node } 拆分后形成的新节点
 * @example
 * ```html
 * <div id="test">abcdef</div>
 * <script>
 *      var newNode = UE.dom.domUtils.split( document.getElementById( "test" ).firstChild, 3 );
 *      //output: def
 *      console.log( newNode.nodeValue );
 * </script>
 * ```
 */

export default function (node, offset) {
  let doc = node.ownerDocument;
  if (browser.ie && offset == node.nodeValue.length) {
    let next = doc.createTextNode('');
    return insertAfter(node, next);
  }
  let retval = node.splitText(offset);
  //ie8下splitText不会跟新childNodes,我们手动触发他的更新
  if (browser.ie8) {
    let tmpNode = doc.createTextNode('');
    insertAfter(retval, tmpNode);
    remove(tmpNode);
  }
  return retval;
}
