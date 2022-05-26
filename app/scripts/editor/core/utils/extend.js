/**
 * 将source对象中的属性扩展到target对象上
 * @method extend
 * @remind 该方法将强制把source对象上的属性复制到target对象上
 * @see UE.utils.extend(Object,Object,Boolean)
 * @param { Object } target 目标对象， 新的属性将附加到该对象上
 * @param { Object } source 源对象， 该对象的属性会被附加到target对象上
 * @return { Object } 返回target对象
 * @example
 * ```javascript
 *
 * var target = { name: 'target', sex: 1 },
 *      source = { name: 'source', age: 17 };
 *
 * UE.utils.extend( target, source );
 *
 * //output: { name: 'source', sex: 1, age: 17 }
 * console.log( target );
 *
 * ```
 */

/**
 * 将source对象中的属性扩展到target对象上， 根据指定的isKeepTarget值决定是否保留目标对象中与
 * 源对象属性名相同的属性值。
 * @method extend
 * @param { Object } target 目标对象， 新的属性将附加到该对象上
 * @param { Object } source 源对象， 该对象的属性会被附加到target对象上
 * @param { Boolean } isKeepTarget 是否保留目标对象中与源对象中属性名相同的属性
 * @return { Object } 返回target对象
 * @example
 * ```javascript
 *
 * var target = { name: 'target', sex: 1 },
 *      source = { name: 'source', age: 17 };
 *
 * UE.utils.extend( target, source, true );
 *
 * //output: { name: 'target', sex: 1, age: 17 }
 * console.log( target );
 *
 * ```
 */
export default function (t, s, b) {
  if (s) {
    for (let k in s) {
      if (!b || !t.hasOwnProperty(k)) {
        t[k] = s[k];
      }
    }
  }
  return t;
}
