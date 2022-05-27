import browser from '../browser';
import utils from '../utils';

/**
 * 判断节点nodeA与节点nodeB的元素的style属性是否一致
 * @method isSameStyle
 * @param { Node } nodeA 需要比较的节点
 * @param { Node } nodeB 需要比较的节点
 * @return { Boolean } 两个节点是否具有相同的style属性值
 * @example
 * ```html
 * <span style="font-size:12px">ssss</span>
 * <span style="font-size:12px">bbbbb</span>
 * <span style="font-size:13px">ssss</span>
 * <span style="font-size:14px">bbbbb</span>
 *
 * <script>
 *
 *     var nodes = document.getElementsByTagName( "span" );
 *
 *     //output: true
 *     console.log( UE.dom.domUtils.isSameStyle( nodes[0], nodes[1] ) );
 *
 *     //output: false
 *     console.log( UE.dom.domUtils.isSameStyle( nodes[2], nodes[3] ) );
 *
 * </script>
 * ```
 */
export default function (nodeA, nodeB) {
  let styleA = nodeA.style.cssText
      .replace(/( ?; ?)/g, ';')
      .replace(/( ?: ?)/g, ':'),
    styleB = nodeB.style.cssText
      .replace(/( ?; ?)/g, ';')
      .replace(/( ?: ?)/g, ':');
  if (browser.opera) {
    styleA = nodeA.style;
    styleB = nodeB.style;
    if (styleA.length != styleB.length) return false;
    for (let p in styleA) {
      if (/^(\d+|csstext)$/i.test(p)) {
        continue;
      }
      if (styleA[p] != styleB[p]) {
        return false;
      }
    }
    return true;
  }
  if (!styleA || !styleB) {
    return styleA == styleB;
  }
  styleA = styleA.split(';');
  styleB = styleB.split(';');
  if (styleA.length != styleB.length) {
    return false;
  }
  for (let i = 0, ci; (ci = styleA[i++]); ) {
    if (utils.indexOf(styleB, ci) == -1) {
      return false;
    }
  }
  return true;
}
