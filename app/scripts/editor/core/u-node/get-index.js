/**
 * 获取当前节点在父节点下的位置索引
 * @method getIndex
 * @return { Number } 返回索引数值，如果没有父节点，返回-1
 * @example
 * ```javascript
 * node.getIndex();
 * ```
 */
export default function getIndex() {
  let parent = this.parentNode;
  for (let i = 0, ci; (ci = parent.children[i]); i++) {
    if (ci === this) {
      return i;
    }
  }
  return -1;
}
