import types from './types';

/**
 * 克隆对象
 * @method clone
 * @param { Object } source 源对象
 * @return { Object } source的一个副本
 */

/**
 * 深度克隆对象，将source的属性克隆到target对象， 会覆盖target重名的属性。
 * @method clone
 * @param { Object } source 源对象
 * @param { Object } target 目标对象
 * @return { Object } 附加了source对象所有属性的target对象
 */

const clone = function (source, target) {
  let tmp;
  target = target || {};
  for (let i in source) {
    if (source.hasOwnProperty(i)) {
      tmp = source[i];
      if (typeof tmp == 'object') {
        target[i] = types.isArray(tmp) ? [] : {};
        clone(source[i], target[i]);
      } else {
        target[i] = tmp;
      }
    }
  }
  return target;
};

export default clone;
