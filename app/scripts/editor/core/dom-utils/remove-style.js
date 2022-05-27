import utils from '../utils';
import browser from '../browser';
import removeAttributes from './remove-attributes';

/**
 * 删除元素element指定的样式
 * @method removeStyle
 * @param { Element } element 需要删除样式的元素
 * @param { String } styleName 需要删除的样式名
 * @example
 * ```html
 * <span id="test" style="color: red; background: blue;"></span>
 *
 * <script>
 *
 *     var testNode = document.getElementById("test");
 *
 *     UE.dom.domUtils.removeStyle( testNode, 'color' );
 *
 *     //output: background: blue;
 *     console.log( testNode.style.cssText );
 *
 * </script>
 * ```
 */
export default function (element, name) {
  if (browser.ie) {
    //针对color先单独处理一下
    if (name == 'color') {
      name = '(^|;)' + name;
    }
    element.style.cssText = element.style.cssText.replace(
      new RegExp(name + '[^:]*:[^;]+;?', 'ig'),
      ''
    );
  } else {
    if (element.style.removeProperty) {
      element.style.removeProperty(name);
    } else {
      element.style.removeAttribute(utils.cssStyleToDomStyle(name));
    }
  }

  if (!element.style.cssText) {
    removeAttributes(element, ['style']);
  }
}
