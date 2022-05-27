import dtd from '../dtd';
import getComputedStyle from './get-computed-style';

/**
 * 检查节点node是否为block元素
 * @method isBlockElm
 * @param { Node } node 需要检测的节点对象
 * @return { Boolean } 是否是block元素节点
 * @warning 该方法的判断规则如下： 如果该元素原本是block元素， 则不论该元素当前的css样式是什么都会返回true；
 *          否则，检测该元素的css样式， 如果该元素当前是block元素， 则返回true。 其余情况下都返回false。
 * @example
 * ```html
 * <span id="test1" style="display: block"></span>
 * <span id="test2"></span>
 * <div id="test3" style="display: inline"></div>
 *
 * <script>
 *
 *     //output: true
 *     console.log( UE.dom.domUtils.isBlockElm( document.getElementById("test1") ) );
 *
 *     //output: false
 *     console.log( UE.dom.domUtils.isBlockElm( document.getElementById("test2") ) );
 *
 *     //output: true
 *     console.log( UE.dom.domUtils.isBlockElm( document.getElementById("test3") ) );
 *
 * </script>
 * ```
 */

export default function (node) {
  return (
    node.nodeType == 1 &&
    (dtd.$block[node.tagName] ||
      styleBlock[getComputedStyle(node, 'display')]) &&
    !dtd.$nonChild[node.tagName]
  );
}
