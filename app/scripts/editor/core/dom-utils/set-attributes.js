import attrFix from './attr-fix';

/**
 * 为节点node添加属性attrs，attrs为属性键值对
 * @method setAttributes
 * @param { Element } node 需要设置属性的元素对象
 * @param { Object } attrs 需要设置的属性名-值对
 * @return { Element } 设置属性的元素对象
 * @example
 * ```html
 * <span id="test"></span>
 *
 * <script>
 *
 *     var testNode = UE.dom.domUtils.setAttributes( document.getElementById( "test" ), {
 *         id: 'demo'
 *     } );
 *
 *     //output: demo
 *     console.log( testNode.id );
 *
 * </script>
 *
 */

export default function (node, attrs) {
  for (let attr in attrs) {
    if (attrs.hasOwnProperty(attr)) {
      let value = attrs[attr];
      switch (attr) {
        case 'class':
          //ie下要这样赋值，setAttribute不起作用
          node.className = value;
          break;
        case 'style':
          node.style.cssText = node.style.cssText + ';' + value;
          break;
        case 'innerHTML':
          node[attr] = value;
          break;
        case 'value':
          node.value = value;
          break;
        default:
          node.setAttribute(attrFix[attr] || attr, value);
      }
    }
  }
  return node;
}
