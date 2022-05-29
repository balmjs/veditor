import getBoundaryInformation from './get-boundary-information';

/**
 * 将ieRange转换为Range对象
 * @param {Range}   ieRange    ieRange对象
 * @param {Range}   range      Range对象
 * @return  {Range}  range       返回转换后的Range对象
 */

export default function (ieRange, range) {
  if (ieRange.item) {
    range.selectNode(ieRange.item(0));
  } else {
    let bi = getBoundaryInformation(ieRange, true);
    range.setStart(bi.container, bi.offset);
    if (ieRange.compareEndPoints('StartToEnd', ieRange) != 0) {
      bi = getBoundaryInformation(ieRange, false);
      range.setEnd(bi.container, bi.offset);
    }
  }
  return range;
}
