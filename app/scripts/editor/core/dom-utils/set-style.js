import utils from '../utils';
import removeAttributes from './remove-attributes';

/**
 * 为元素element设置样式属性值
 * @method setStyle
 * @param { Element } element 需要设置样式的元素
 * @param { String } styleName 样式名
 * @param { String } styleValue 样式值
 * @example
 * ```html
 * <div id="test"></div>
 *
 * <script>
 *
 *      var testNode = document.getElementById( "test" );
 *
 *      //output: ""
 *      console.log( testNode.style.color );
 *
 *      UE.dom.domUtils.setStyle( testNode, 'color', 'red' );
 *      //output: "red"
 *      console.log( testNode.style.color );
 *
 * </script>
 * ```
 */
export default function (element, name, value) {
  element.style[utils.cssStyleToDomStyle(name)] = value;
  if (!utils.trim(element.style.cssText)) {
    removeAttributes(element, 'style');
  }
}
