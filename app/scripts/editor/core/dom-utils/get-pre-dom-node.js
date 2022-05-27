import getDomNode from './get-dom-node';

export default function (node, startFromChild, filterFn, guard) {
  return getDomNode(
    node,
    'lastChild',
    'previousSibling',
    startFromChild,
    filterFn,
    guard
  );
}
