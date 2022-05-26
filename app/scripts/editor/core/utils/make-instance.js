/**
 * 以给定对象作为原型创建一个新对象
 * @method makeInstance
 * @param { Object } protoObject 该对象将作为新创建对象的原型
 * @return { Object } 新的对象， 该对象的原型是给定的protoObject对象
 * @example
 * ```javascript
 *
 * var protoObject = { sayHello: function () { console.log('Hello UEditor!'); } };
 *
 * var newObject = UE.utils.makeInstance( protoObject );
 * //output: Hello UEditor!
 * newObject.sayHello();
 * ```
 */
export default function (obj) {
  let noop = new Function();
  noop.prototype = obj;
  obj = new noop();
  noop.prototype = null;
  return obj;
}
