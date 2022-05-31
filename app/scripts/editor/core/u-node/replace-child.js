/**
 * 用新的节点替换当前节点
 * @method replaceChild
 * @param { UE.uNode } target 要替换成该节点参数
 * @param { UE.uNode } source 要被替换掉的节点
 * @return { UE.uNode } 返回替换之后的节点对象
 * @example
 * ```javascript
 * node.replaceChild(newNode, childNode); //用newNode替换childNode,childNode是node的子节点
 * ```
 */
export default function replaceChild(target, source) {
  if (this.children) {
    if (target.parentNode) {
      target.parentNode.removeChild(target);
    }
    for (let i = 0, ci; (ci = this.children[i]); i++) {
      if (ci === source) {
        this.children.splice(i, 1, target);
        source.parentNode = null;
        target.parentNode = this;
        return target;
      }
    }
  }
}
