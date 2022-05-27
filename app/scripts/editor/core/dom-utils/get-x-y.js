/**
 * 获取元素element相对于viewport的位置坐标
 * @method getXY
 * @param { Node } element 需要计算位置的节点对象
 * @return { Object } 返回形如{x:left,y:top}的一个key-value映射对象， 其中键x代表水平偏移距离，
 *                          y代表垂直偏移距离。
 *
 * @example
 * ```javascript
 * var location = UE.dom.domUtils.getXY( document.getElementById("test") );
 * //output: test的坐标为: 12, 24
 * console.log( 'test的坐标为： ', location.x, ',', location.y );
 * ```
 */

export default function (element) {
  var x = 0,
    y = 0;
  while (element.offsetParent) {
    y += element.offsetTop;
    x += element.offsetLeft;
    element = element.offsetParent;
  }
  return { x: x, y: y };
}
