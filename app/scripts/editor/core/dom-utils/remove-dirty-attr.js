/**
 * 删除_moz_dirty属性
 * @private
 * @method removeDirtyAttr
 */

export default function (node) {
  for (
    let i = 0, ci, nodes = node.getElementsByTagName('*');
    (ci = nodes[i++]);

  ) {
    ci.removeAttribute('_moz_dirty');
  }
  node.removeAttribute('_moz_dirty');
}
