import trimWhiteTextNode from './trim-white-text-node';
import isSameStyle from './is-same-style';
import remove from './remove';
/**
 * 将节点node提取到父节点上
 * @method mergeToParent
 * @param { Element } node 需要提取的元素对象
 * @example
 * ```html
 * <div id="parent">
 *     <div id="sub">
 *         <span id="child"></span>
 *     </div>
 * </div>
 *
 * <script>
 *
 *     var child = document.getElementById( "child" );
 *
 *     //output: sub
 *     console.log( child.parentNode.id );
 *
 *     UE.dom.domUtils.mergeToParent( child );
 *
 *     //output: parent
 *     console.log( child.parentNode.id );
 *
 * </script>
 * ```
 */

export default function (node) {
  let parent = node.parentNode;
  while (parent && dtd.$removeEmpty[parent.tagName]) {
    if (parent.tagName == node.tagName || parent.tagName == 'A') {
      //针对a标签单独处理
      trimWhiteTextNode(parent);
      //span需要特殊处理  不处理这样的情况 <span stlye="color:#fff">xxx<span style="color:#ccc">xxx</span>xxx</span>
      if (
        (parent.tagName == 'SPAN' && !isSameStyle(parent, node)) ||
        (parent.tagName == 'A' && node.tagName == 'SPAN')
      ) {
        if (parent.childNodes.length > 1 || parent !== node.parentNode) {
          node.style.cssText = parent.style.cssText + ';' + node.style.cssText;
          parent = parent.parentNode;
          continue;
        } else {
          parent.style.cssText += ';' + node.style.cssText;
          //trace:952 a标签要保持下划线
          if (parent.tagName == 'A') {
            parent.style.textDecoration = 'underline';
          }
        }
      }
      if (parent.tagName != 'A') {
        parent === node.parentNode && remove(node, true);
        break;
      }
    }
    parent = parent.parentNode;
  }
}
