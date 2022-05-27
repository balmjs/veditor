import setStyle from './set-style';

/**
 * 为元素element设置多个样式属性值
 * @method setStyles
 * @param { Element } element 需要设置样式的元素
 * @param { Object } styles 样式名值对
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
 *      UE.dom.domUtils.setStyles( testNode, {
 *          'color': 'red'
 *      } );
 *      //output: "red"
 *      console.log( testNode.style.color );
 *
 * </script>
 * ```
 */
export default function (element, styles) {
  for (let name in styles) {
    if (styles.hasOwnProperty(name)) {
      setStyle(element, name, styles[name]);
    }
  }
}
