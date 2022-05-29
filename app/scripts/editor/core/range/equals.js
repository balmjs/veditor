/**
 * 判断给定的Range对象是否和当前Range对象表示的是同一个选区
 * @method equals
 * @param { UE.dom.Range } 需要判断的Range对象
 * @return { Boolean } 如果给定的Range对象与当前Range对象表示的是同一个选区， 则返回true， 否则返回false
 */

export default function (rng) {
  for (let p in this) {
    if (this.hasOwnProperty(p)) {
      if (this[p] !== rng[p]) return false;
    }
  }
  return true;
}
