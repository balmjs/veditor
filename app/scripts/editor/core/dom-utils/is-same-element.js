import isSameStyle from './is-same-style';
/**
 * 比较节点nodeA与节点nodeB是否具有相同的标签名、属性名以及属性值
 * @method  isSameElement
 * @param { Node } nodeA 需要比较的节点
 * @param { Node } nodeB 需要比较的节点
 * @return { Boolean } 两个节点是否具有相同的标签名、属性名以及属性值
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
 *     console.log( UE.dom.domUtils.isSameElement( nodes[0], nodes[1] ) );
 *
 *     //output: false
 *     console.log( UE.dom.domUtils.isSameElement( nodes[2], nodes[3] ) );
 *
 * </script>
 * ```
 */

export default function (nodeA, nodeB) {
  if (nodeA.tagName != nodeB.tagName) {
    return false;
  }
  let thisAttrs = nodeA.attributes,
    otherAttrs = nodeB.attributes;
  if (!ie && thisAttrs.length != otherAttrs.length) {
    return false;
  }
  let attrA,
    attrB,
    al = 0,
    bl = 0;
  for (let i = 0; (attrA = thisAttrs[i++]); ) {
    if (attrA.nodeName == 'style') {
      if (attrA.specified) {
        al++;
      }
      if (isSameStyle(nodeA, nodeB)) {
        continue;
      } else {
        return false;
      }
    }
    if (ie) {
      if (attrA.specified) {
        al++;
        attrB = otherAttrs.getNamedItem(attrA.nodeName);
      } else {
        continue;
      }
    } else {
      attrB = nodeB.attributes[attrA.nodeName];
    }
    if (!attrB.specified || attrA.nodeValue != attrB.nodeValue) {
      return false;
    }
  }
  // 有可能attrB的属性包含了attrA的属性之外还有自己的属性
  if (ie) {
    for (i = 0; (attrB = otherAttrs[i++]); ) {
      if (attrB.specified) {
        bl++;
      }
    }
    if (al != bl) {
      return false;
    }
  }
  return true;
}
