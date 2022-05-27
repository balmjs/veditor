/**
 * 移动元素使得该元素的位置移动指定的偏移量的距离
 * @method setViewportOffset
 * @param { Element } element 需要设置偏移量的元素
 * @param { Object } offset 偏移量， 形如{ left: 100, top: 50 }的一个键值对， 表示该元素将在
 *                                  现有的位置上向水平方向偏移offset.left的距离， 在竖直方向上偏移
 *                                  offset.top的距离
 * @example
 * ```html
 * <div id="test" style="top: 100px; left: 50px; position: absolute;"></div>
 *
 * <script>
 *
 *     var testNode = document.getElementById("test");
 *
 *     UE.dom.domUtils.setViewportOffset( testNode, {
 *         left: 200,
 *         top: 50
 *     } );
 *
 *     //output: top: 300px; left: 100px; position: absolute;
 *     console.log( testNode.style.cssText );
 *
 * </script>
 * ```
 */
export default function (element, offset) {
  var left = parseInt(element.style.left) | 0;
  var top = parseInt(element.style.top) | 0;
  var rect = element.getBoundingClientRect();
  var offsetLeft = offset.left - rect.left;
  var offsetTop = offset.top - rect.top;
  if (offsetLeft) {
    element.style.left = left + offsetLeft + 'px';
  }
  if (offsetTop) {
    element.style.top = top + offsetTop + 'px';
  }
}
