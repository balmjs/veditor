import utils from '../utils';

/**
 * 获取元素element的style属性的指定值
 * @method getStyle
 * @param { Element } element 需要获取属性值的元素
 * @param { String } styleName 需要获取的style的名称
 * @warning 该方法仅获取元素style属性中所标明的值
 * @return { String } 该元素包含指定的style属性值
 * @example
 * ```html
 * <div id="test" style="color: red;"></div>
 *
 * <script>
 *
 *      var testNode = document.getElementById( "test" );
 *
 *      //output: red
 *      console.log( UE.dom.domUtils.getStyle( testNode, "color" ) );
 *
 *      //output: ""
 *      console.log( UE.dom.domUtils.getStyle( testNode, "background" ) );
 *
 * </script>
 * ```
 */
export default function (element, name) {
  let value = element.style[utils.cssStyleToDomStyle(name)];
  return utils.fixColor(name, value);
}
