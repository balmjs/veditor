/**
 * 用给定的迭代器遍历对象
 * @method each
 * @param { Object } obj 需要遍历的对象
 * @param { Function } iterator 迭代器， 该方法接受两个参数， 第一个参数是当前所处理的value， 第二个参数是当前遍历对象的key
 * @example
 * ```javascript
 * var demoObj = {
 *     key1: 1,
 *     key2: 2
 * };
 *
 * //output: key1: 1, key2: 2
 * UE.utils.each( demoObj, funciton ( value, key ) {
 *
 *     console.log( key + ":" + value );
 *
 * } );
 * ```
 */

/**
 * 用给定的迭代器遍历数组或类数组对象
 * @method each
 * @param { Array } array 需要遍历的数组或者类数组
 * @param { Function } iterator 迭代器， 该方法接受两个参数， 第一个参数是当前所处理的value， 第二个参数是当前遍历对象的key
 * @example
 * ```javascript
 * var divs = document.getElmentByTagNames( "div" );
 *
 * //output: 0: DIV, 1: DIV ...
 * UE.utils.each( divs, funciton ( value, key ) {
 *
 *     console.log( key + ":" + value.tagName );
 *
 * } );
 * ```
 */

export default function (obj, iterator, context) {
  if (obj == null) return;
  if (obj.length === +obj.length) {
    for (let i = 0, l = obj.length; i < l; i++) {
      if (iterator.call(context, obj[i], i, obj) === false) return false;
    }
  } else {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (iterator.call(context, obj[key], key, obj) === false) return false;
      }
    }
  }
}
