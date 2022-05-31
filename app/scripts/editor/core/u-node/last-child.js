/**
 * 获取当前节点下的最后一个子节点
 * @method lastChild
 * @return { UE.uNode } 返回最后一个子节点
 * @example
 * ```javascript
 * node.lastChild(); //返回最后一个子节点
 * ```
 */
export default function lastChild() {
  //            if (this.type != 'element' || dtd.$empty[this.tagName] ) {
  //                return this;
  //            }
  return this.children ? this.children[this.children.length - 1] : null;
}
