import makeInstance from './make-instance';
import extend from './extend';

/**
 * 模拟继承机制， 使得subClass继承自superClass
 * @method inherits
 * @param { Object } subClass 子类对象
 * @param { Object } superClass 超类对象
 * @warning 该方法只能让subClass继承超类的原型， subClass对象自身的属性和方法不会被继承
 * @return { Object } 继承superClass后的子类对象
 * @example
 * ```javascript
 * function SuperClass(){
 *     this.name = "小李";
 * }
 *
 * SuperClass.prototype = {
 *     hello:function(str){
 *         console.log(this.name + str);
 *     }
 * }
 *
 * function SubClass(){
 *     this.name = "小张";
 * }
 *
 * UE.utils.inherits(SubClass,SuperClass);
 *
 * var sub = new SubClass();
 * //output: '小张早上好!
 * sub.hello("早上好!");
 * ```
 */
export default function (subClass, superClass) {
  let oldP = subClass.prototype;
  let newP = makeInstance(superClass.prototype);
  extend(newP, oldP, true);
  subClass.prototype = newP;
  return (newP.constructor = subClass);
}
