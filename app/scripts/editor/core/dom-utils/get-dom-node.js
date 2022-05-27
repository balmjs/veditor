const getDomNode = function (node, start, ltr, startFromChild, fn, guard) {
  let tmpNode = startFromChild && node[start],
    parent;
  !tmpNode && (tmpNode = node[ltr]);
  while (!tmpNode && (parent = (parent || node).parentNode)) {
    if (parent.tagName == 'BODY' || (guard && !guard(parent))) {
      return null;
    }
    tmpNode = parent[ltr];
  }
  if (tmpNode && fn && !fn(tmpNode)) {
    return getDomNode(tmpNode, start, ltr, false, fn);
  }
  return tmpNode;
};

export default getDomNode;
