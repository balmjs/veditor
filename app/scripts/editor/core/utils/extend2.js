/**
 * 将给定的多个对象的属性复制到目标对象target上
 * @method extend2
 * @remind 该方法将强制把源对象上的属性复制到target对象上
 * @remind 该方法支持两个及以上的参数， 从第二个参数开始， 其属性都会被复制到第一个参数上。 如果遇到同名的属性，
 *          将会覆盖掉之前的值。
 * @param { Object } target 目标对象， 新的属性将附加到该对象上
 * @param { Object... } source 源对象， 支持多个对象， 该对象的属性会被附加到target对象上
 * @return { Object } 返回target对象
 * @example
 * ```javascript
 *
 * var target = {},
 *     source1 = { name: 'source', age: 17 },
 *     source2 = { title: 'dev' };
 *
 * UE.utils.extend2( target, source1, source2 );
 *
 * //output: { name: 'source', age: 17, title: 'dev' }
 * console.log( target );
 *
 * ```
 */

export default function (t) {
  let a = arguments;
  for (let i = 1; i < a.length; i++) {
    let x = a[i];
    for (let k in x) {
      if (!t.hasOwnProperty(k)) {
        t[k] = x[k];
      }
    }
  }
  return t;
}
