/**
 * 从当前节点的子节点列表中，移除节点
 * @method removeChild
 * @param { UE.uNode } node 要移除的节点引用
 * @param { Boolean } keepChildren 是否保留移除节点的子节点，若传入true，自动把移除节点的子节点插入到移除的位置
 * @return { * } 返回刚移除的子节点
 * @example
 * ```javascript
 * node.removeChild(childNode,true); //在node的子节点列表中移除child节点，并且吧child的子节点插入到移除的位置
 * ```
 */
export default function removeChild(node, keepChildren) {
  if (this.children) {
    for (let i = 0, ci; (ci = this.children[i]); i++) {
      if (ci === node) {
        this.children.splice(i, 1);
        ci.parentNode = null;
        if (keepChildren && ci.children && ci.children.length) {
          for (let j = 0, cj; (cj = ci.children[j]); j++) {
            this.children.splice(i + j, 0, cj);
            cj.parentNode = this;
          }
        }
        return ci;
      }
    }
  }
}
