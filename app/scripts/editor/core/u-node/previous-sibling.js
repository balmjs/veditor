/**
 * 获取和当前节点有相同父亲节点的前一个节点
 * @method previousSibling
 * @return { UE.uNode } 返回前一个节点
 * @example
 * ```javascript
 * node.children[2].previousSibling(); //返回子节点node.children[1]
 * ```
 */
export default function previousSibling() {
  let parent = this.parentNode;
  for (let i = 0, ci; (ci = parent.children[i]); i++) {
    if (ci === this) {
      return i == 0 ? null : parent.children[i - 1];
    }
  }
}
