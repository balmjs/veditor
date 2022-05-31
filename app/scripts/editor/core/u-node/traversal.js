import { nodeTraversal } from './constans';

/**
 * 传入一个函数，递归遍历当前节点下的所有节点
 * @method traversal
 * @param { Function } fn 遍历到节点的时，传入节点作为参数，运行此函数
 * @example
 * ```javascript
 * traversal(node, function(){
 *     console.log(node.type);
 * });
 * ```
 */
export default function traversal(fn) {
  if (this.children && this.children.length) {
    nodeTraversal(this, fn);
  }
  return this;
}
