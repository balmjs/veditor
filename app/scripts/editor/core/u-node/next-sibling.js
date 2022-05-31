/**
 * 获取和当前节点有相同父亲节点的后一个节点
 * @method nextSibling
 * @return { UE.uNode } 返回后一个节点,找不到返回null
 * @example
 * ```javascript
 * node.children[2].nextSibling(); //如果有，返回子节点node.children[3]
 * ```
 */
export default function nextSibling() {
  let parent = this.parentNode;
  for (let i = 0, ci; (ci = parent.children[i++]); ) {
    if (ci === this) {
      return parent.children[i];
    }
  }
}
