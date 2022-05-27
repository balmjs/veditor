/**
 * 把节点src的所有子节点追加到另一个节点tag上去
 * @method moveChild
 * @param { Node } src 源节点， 该节点下的所有子节点将被移除
 * @param { Node } tag 目标节点， 从源节点移除的子节点将被追加到该节点下
 * @example
 * ```html
 * <div id="test1">
 *      <span></span>
 * </div>
 * <div id="test2">
 *     <div></div>
 * </div>
 *
 * <script>
 *
 *     var test1 = document.getElementById("test1"),
 *         test2 = document.getElementById("test2");
 *
 *     UE.dom.domUtils.moveChild( test1, test2 );
 *
 *     //output: ""（空字符串）
 *     console.log( test1.innerHTML );
 *
 *     //output: "<div></div><span></span>"
 *     console.log( test2.innerHTML );
 *
 * </script>
 * ```
 */

/**
 * 把节点src的所有子节点移动到另一个节点tag上去, 可以通过dir参数控制附加的行为是“追加”还是“插入顶部”
 * @method moveChild
 * @param { Node } src 源节点， 该节点下的所有子节点将被移除
 * @param { Node } tag 目标节点， 从源节点移除的子节点将被附加到该节点下
 * @param { Boolean } dir 附加方式， 如果为true， 则附加进去的节点将被放到目标节点的顶部， 反之，则放到末尾
 * @example
 * ```html
 * <div id="test1">
 *      <span></span>
 * </div>
 * <div id="test2">
 *     <div></div>
 * </div>
 *
 * <script>
 *
 *     var test1 = document.getElementById("test1"),
 *         test2 = document.getElementById("test2");
 *
 *     UE.dom.domUtils.moveChild( test1, test2, true );
 *
 *     //output: ""（空字符串）
 *     console.log( test1.innerHTML );
 *
 *     //output: "<span></span><div></div>"
 *     console.log( test2.innerHTML );
 *
 * </script>
 * ```
 */
export default function (src, tag, dir) {
  while (src.firstChild) {
    if (dir && tag.firstChild) {
      tag.insertBefore(src.lastChild, tag.firstChild);
    } else {
      tag.appendChild(src.firstChild);
    }
  }
}
