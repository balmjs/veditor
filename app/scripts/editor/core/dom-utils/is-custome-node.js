/**
 * 检测节点是否是UEditor所使用的辅助节点
 * @method isCustomeNode
 * @private
 * @param { Node } node 需要检测的节点
 * @remind 辅助节点是指编辑器要完成工作临时添加的节点， 在输出的时候将会从编辑器内移除， 不会影响最终的结果。
 * @return { Boolean } 给定的节点是否是一个辅助节点
 */

export default function (node) {
  return node.nodeType == 1 && node.getAttribute('_ue_custom_node_');
}
