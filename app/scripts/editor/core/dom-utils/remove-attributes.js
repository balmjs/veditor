import utils from '../utils';
import browser from '../browser';

import attrFix from './attr-fix';

/**
 * 删除节点node上的指定属性名称的属性
 * @method  removeAttributes
 * @param { Node } node 需要删除属性的节点对象
 * @param { String } attrNames 可以是空格隔开的多个属性名称，该操作将会依次删除相应的属性
 * @example
 * ```html
 * <div id="wrap">
 *      <span style="font-size:14px;" id="test" name="followMe">xxxxx</span>
 * </div>
 *
 * <script>
 *
 *     UE.dom.domUtils.removeAttributes( document.getElementById( "test" ), "id name" );
 *
 *     //output: <span style="font-size:14px;">xxxxx</span>
 *     console.log( document.getElementById("wrap").innerHTML );
 *
 * </script>
 * ```
 */

/**
 * 删除节点node上的指定属性名称的属性
 * @method  removeAttributes
 * @param { Node } node 需要删除属性的节点对象
 * @param { Array } attrNames 需要删除的属性名数组
 * @example
 * ```html
 * <div id="wrap">
 *      <span style="font-size:14px;" id="test" name="followMe">xxxxx</span>
 * </div>
 *
 * <script>
 *
 *     UE.dom.domUtils.removeAttributes( document.getElementById( "test" ), ["id", "name"] );
 *
 *     //output: <span style="font-size:14px;">xxxxx</span>
 *     console.log( document.getElementById("wrap").innerHTML );
 *
 * </script>
 * ```
 */
export default function (node, attrNames) {
  attrNames = utils.isArray(attrNames)
    ? attrNames
    : utils
        .trim(attrNames)
        .replace(/[ ]{2,}/g, ' ')
        .split(' ');
  for (let i = 0, ci; (ci = attrNames[i++]); ) {
    ci = attrFix[ci] || ci;
    switch (ci) {
      case 'className':
        node[ci] = '';
        break;
      case 'style':
        node.style.cssText = '';
        let val = node.getAttributeNode('style');
        !browser.ie && val && node.removeAttributeNode(val);
    }
    node.removeAttribute(ci);
  }
}
