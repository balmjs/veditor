/**
 * 在传入节点的后面插入一个节点
 * @method insertAfter
 * @param { UE.uNode } target 要插入的节点
 * @param { UE.uNode } source 在该参数节点后面插入
 * @return { UE.uNode } 返回刚插入的子节点
 * @example
 * ```javascript
 * node.parentNode.insertAfter(newNode, node); //在node节点后面插入newNode
 * ```
 */
export default function insertAfter(target, source) {
  if (this.children) {
    if (target.parentNode) {
      target.parentNode.removeChild(target);
    }
    for (let i = 0, ci; (ci = this.children[i]); i++) {
      if (ci === source) {
        this.children.splice(i + 1, 0, target);
        target.parentNode = this;
        return target;
      }
    }
  }
}
