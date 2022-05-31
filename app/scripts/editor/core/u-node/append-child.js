import dtd from '../dtd';

/**
 * 在节点的子节点列表最后位置插入一个节点
 * @method appendChild
 * @param { UE.uNode } node 要插入的节点
 * @return { UE.uNode } 返回刚插入的子节点
 * @example
 * ```javascript
 * node.appendChild( newNode ); //在node内插入子节点newNode
 * ```
 */
export default function appendChild(node) {
  if (
    this.type == 'root' ||
    (this.type == 'element' && !dtd.$empty[this.tagName])
  ) {
    if (!this.children) {
      this.children = [];
    }
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
    for (let i = 0, ci; (ci = this.children[i]); i++) {
      if (ci === node) {
        this.children.splice(i, 1);
        break;
      }
    }
    this.children.push(node);
    node.parentNode = this;
    return node;
  }
}
