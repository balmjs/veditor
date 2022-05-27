import removeAttributes from './remove-attributes';

export default function (nodes) {
  var node;
  while ((node = nodes.pop())) {
    removeAttributes(node, ['class']);
  }
}
