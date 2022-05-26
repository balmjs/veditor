/**
 * 用指定的context对象作为函数fn的上下文
 * @method bind
 * @param { Function } fn 需要绑定上下文的函数对象
 * @param { Object } content 函数fn新的上下文对象
 * @return { Function } 一个新的函数， 该函数作为原始函数fn的代理， 将完成fn的上下文调换工作。
 * @example
 * ```javascript
 *
 * var name = 'window',
 *     newTest = null;
 *
 * function test () {
 *     console.log( this.name );
 * }
 *
 * newTest = UE.utils.bind( test, { name: 'object' } );
 *
 * //output: object
 * newTest();
 *
 * //output: window
 * test();
 *
 * ```
 */
export default function (fn, context) {
  return function () {
    return fn.apply(context, arguments);
  };
}
