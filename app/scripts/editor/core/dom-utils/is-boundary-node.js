import isBody from './is-body';

export default function (node, dir) {
  let tmp;
  while (!isBody(node)) {
    tmp = node;
    node = node.parentNode;
    if (tmp !== node[dir]) {
      return false;
    }
  }
  return true;
}
