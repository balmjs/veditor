import types from './types';

/**
 * 判断obj对象是否为空
 * @method isEmptyObject
 * @param { * } obj 需要判断的对象
 * @remind 如果判断的对象是NULL， 将直接返回true， 如果是数组且为空， 返回true， 如果是字符串， 且字符串为空，
 *          返回true， 如果是普通对象， 且该对象没有任何实例属性， 返回true
 * @return { Boolean } 对象是否为空
 * @example
 * ```javascript
 *
 * //output: true
 * console.log( UE.utils.isEmptyObject( {} ) );
 *
 * //output: true
 * console.log( UE.utils.isEmptyObject( [] ) );
 *
 * //output: true
 * console.log( UE.utils.isEmptyObject( "" ) );
 *
 * //output: false
 * console.log( UE.utils.isEmptyObject( { key: 1 } ) );
 *
 * //output: false
 * console.log( UE.utils.isEmptyObject( [1] ) );
 *
 * //output: false
 * console.log( UE.utils.isEmptyObject( "1" ) );
 *
 * ```
 */

export default function (obj) {
  if (obj == null) return true;
  if (types.isArray(obj) || types.isString(obj)) return obj.length === 0;
  for (let key in obj) if (obj.hasOwnProperty(key)) return false;
  return true;
}
