import browser from '../browser';

/**
 * 判断节点的标签上是否不存在任何属性
 * @method hasNoAttributes
 * @private
 * @param { Node } node 需要检测的节点对象
 * @return { Boolean } 节点是否不包含任何属性
 * @example
 * ```html
 * <div id="test"><span>xxxx</span></div>
 *
 * <script>
 *
 *     //output: false
 *     console.log( UE.dom.domUtils.hasNoAttributes( document.getElementById("test") ) );
 *
 *     //output: true
 *     console.log( UE.dom.domUtils.hasNoAttributes( document.getElementById("test").firstChild ) );
 *
 * </script>
 * ```
 */
export default function (node) {
  return browser.ie
    ? /^<\w+\s*?>/.test(node.outerHTML)
    : node.attributes.length == 0;
}
