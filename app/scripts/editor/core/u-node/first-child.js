/**
 * 获取当前节点下的第一个子节点
 * @method firstChild
 * @return { UE.uNode } 返回第一个子节点
 * @example
 * ```javascript
 * node.firstChild(); //返回第一个子节点
 * ```
 */
export default function firstChild() {
  //            if (this.type != 'element' || dtd.$empty[this.tagName]) {
  //                return this;
  //            }
  return this.children ? this.children[0] : null;
}
