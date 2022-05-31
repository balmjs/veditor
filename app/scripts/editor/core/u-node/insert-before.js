/**
 * 在传入节点的前面插入一个节点
 * @method insertBefore
 * @param { UE.uNode } target 要插入的节点
 * @param { UE.uNode } source 在该参数节点前面插入
 * @return { UE.uNode } 返回刚插入的子节点
 * @example
 * ```javascript
 * node.parentNode.insertBefore(newNode, node); //在node节点后面插入newNode
 * ```
 */
export default function insertBefore(target, source) {
  if (this.children) {
    if (target.parentNode) {
      target.parentNode.removeChild(target);
    }
    for (let i = 0, ci; (ci = this.children[i]); i++) {
      if (ci === source) {
        this.children.splice(i, 0, target);
        target.parentNode = this;
        return target;
      }
    }
  }
}
