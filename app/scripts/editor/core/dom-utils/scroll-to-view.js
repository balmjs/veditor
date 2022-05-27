import getXY from './get-x-y';

/**
 * 将显示区域滚动到指定节点的位置
 * @method scrollToView
 * @param    {Node}   node    节点
 * @param    {window}   win      window对象
 * @param    {Number}    offsetTop    距离上方的偏移量
 */
export default function (node, win, offsetTop) {
  const getViewPaneSize = function () {
    let doc = win.document,
      mode = doc.compatMode == 'CSS1Compat';
    return {
      width:
        (mode ? doc.documentElement.clientWidth : doc.body.clientWidth) || 0,
      height:
        (mode ? doc.documentElement.clientHeight : doc.body.clientHeight) || 0
    };
  };
  const getScrollPosition = function (win) {
    if ('pageXOffset' in win) {
      return {
        x: win.pageXOffset || 0,
        y: win.pageYOffset || 0
      };
    } else {
      let doc = win.document;
      return {
        x: doc.documentElement.scrollLeft || doc.body.scrollLeft || 0,
        y: doc.documentElement.scrollTop || doc.body.scrollTop || 0
      };
    }
  };
  let winHeight = getViewPaneSize().height,
    offset = winHeight * -1 + offsetTop;
  offset += node.offsetHeight || 0;
  let elementPosition = getXY(node);
  offset += elementPosition.y;
  let currentScroll = getScrollPosition(win).y;
  // offset += 50;
  if (offset > currentScroll || offset < currentScroll - winHeight) {
    win.scrollTo(0, offset + (offset < 0 ? -20 : 20));
  }
}
