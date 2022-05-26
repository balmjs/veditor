/**
 * 创建延迟指定时间后执行的函数fn
 * @method defer
 * @param { Function } fn 需要延迟执行的函数对象
 * @param { int } delay 延迟的时间， 单位是毫秒
 * @warning 该方法的时间控制是不精确的，仅仅只能保证函数的执行是在给定的时间之后，
 *           而不能保证刚好到达延迟时间时执行。
 * @return { Function } 目标函数fn的代理函数， 只有执行该函数才能起到延时效果
 * @example
 * ```javascript
 * var start = 0;
 *
 * function test(){
 *     console.log( new Date() - start );
 * }
 *
 * var testDefer = UE.utils.defer( test, 1000 );
 * //
 * start = new Date();
 * //output: (大约在1000毫秒之后输出) 1000
 * testDefer();
 * ```
 */

/**
 * 创建延迟指定时间后执行的函数fn, 如果在延迟时间内再次执行该方法， 将会根据指定的exclusion的值，
 * 决定是否取消前一次函数的执行， 如果exclusion的值为true， 则取消执行，反之，将继续执行前一个方法。
 * @method defer
 * @param { Function } fn 需要延迟执行的函数对象
 * @param { int } delay 延迟的时间， 单位是毫秒
 * @param { Boolean } exclusion 如果在延迟时间内再次执行该函数，该值将决定是否取消执行前一次函数的执行，
 *                     值为true表示取消执行， 反之则将在执行前一次函数之后才执行本次函数调用。
 * @warning 该方法的时间控制是不精确的，仅仅只能保证函数的执行是在给定的时间之后，
 *           而不能保证刚好到达延迟时间时执行。
 * @return { Function } 目标函数fn的代理函数， 只有执行该函数才能起到延时效果
 * @example
 * ```javascript
 *
 * function test(){
 *     console.log(1);
 * }
 *
 * var testDefer = UE.utils.defer( test, 1000, true );
 *
 * //output: (两次调用仅有一次输出) 1
 * testDefer();
 * testDefer();
 * ```
 */

export default function (fn, delay, exclusion) {
  let timerID;
  return function () {
    if (exclusion) {
      clearTimeout(timerID);
    }
    timerID = setTimeout(fn, delay);
  };
}
