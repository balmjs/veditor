/**
 * 如果选区在文本的边界上，就扩展选区到文本的父节点上, 如果当前选区是闭合的， 则什么也不做
 * @method txtToElmBoundary
 * @remind 该操作不会修改dom节点
 * @return { UE.dom.Range } 当前range对象
 */

/**
 * 如果选区在文本的边界上，就扩展选区到文本的父节点上, 如果当前选区是闭合的， 则根据参数项
 * ignoreCollapsed 的值决定是否执行该调整
 * @method txtToElmBoundary
 * @param { Boolean } ignoreCollapsed 是否忽略选区的闭合状态， 如果该参数取值为true， 则
 *                      不论选区是否闭合， 都会执行该操作， 反之， 则不会对闭合的选区执行该操作
 * @return { UE.dom.Range } 当前range对象
 */
export default function (ignoreCollapsed) {
  function adjust(r, c) {
    let container = r[c + 'Container'],
      offset = r[c + 'Offset'];
    if (container.nodeType == 3) {
      if (!offset) {
        r[
          'set' +
            c.replace(/(\w)/, function (a) {
              return a.toUpperCase();
            }) +
            'Before'
        ](container);
      } else if (offset >= container.nodeValue.length) {
        r[
          'set' +
            c.replace(/(\w)/, function (a) {
              return a.toUpperCase();
            }) +
            'After'
        ](container);
      }
    }
  }

  if (ignoreCollapsed || !this.collapsed) {
    adjust(this, 'start');
    adjust(this, 'end');
  }
  return this;
}
