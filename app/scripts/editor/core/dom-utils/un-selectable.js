import browser, { isIe } from '../browser';
/**
 * 设置节点node及其子节点不会被选中
 * @method unSelectable
 * @param { Element } node 需要执行操作的dom元素
 * @remind 执行该操作后的节点， 将不能被鼠标选中
 * @example
 * ```javascript
 * UE.dom.domUtils.unSelectable( document.body );
 * ```
 */
const handler4ie9below = function (node) {
  //for ie9
  node.onselectstart = function () {
    return false;
  };
  node.onclick =
    node.onkeyup =
    node.onkeydown =
      function () {
        return false;
      };
  node.unselectable = 'on';
  node.setAttribute('unselectable', 'on');
  for (let i = 0, ci; (ci = node.all[i++]); ) {
    switch (ci.tagName.toLowerCase()) {
      case 'iframe':
      case 'textarea':
      case 'input':
      case 'select':
        break;
      default:
        ci.unselectable = 'on';
        node.setAttribute('unselectable', 'on');
    }
  }
};
const handler = function (node) {
  node.style.MozUserSelect =
    node.style.webkitUserSelect =
    node.style.msUserSelect =
    node.style.KhtmlUserSelect =
      'none';
};

const unSelectable =
  (isIe && browser.ie9below) || browser.opera ? handler4ie9below : handler;

export default unSelectable;
