import utils from '../utils';

/**
 * 给定一个节点数组，在通过指定的过滤器过滤后， 获取其中满足过滤条件的第一个节点
 * @method filterNodeList
 * @param { Array } nodeList 需要过滤的节点数组
 * @param { Function } fn 过滤器， 对符合条件的节点， 执行结果返回true， 反之则返回false
 * @return { Node | NULL } 如果找到符合过滤条件的节点， 则返回该节点， 否则返回NULL
 * @example
 * ```javascript
 * var divNodes = document.getElementsByTagName("div");
 * divNodes = [].slice.call( divNodes, 0 );
 *
 * //output: null
 * console.log( UE.dom.domUtils.filterNodeList( divNodes, function ( node ) {
 *     return node.tagName.toLowerCase() !== 'div';
 * } ) );
 * ```
 */

/**
 * 给定一个节点数组nodeList和一组标签名tagNames， 获取其中能够匹配标签名的节点集合中的第一个节点
 * @method filterNodeList
 * @param { Array } nodeList 需要过滤的节点数组
 * @param { String } tagNames 需要匹配的标签名， 多个标签名之间用空格分割
 * @return { Node | NULL } 如果找到标签名匹配的节点， 则返回该节点， 否则返回NULL
 * @example
 * ```javascript
 * var divNodes = document.getElementsByTagName("div");
 * divNodes = [].slice.call( divNodes, 0 );
 *
 * //output: null
 * console.log( UE.dom.domUtils.filterNodeList( divNodes, 'a span' ) );
 * ```
 */

/**
 * 给定一个节点数组，在通过指定的过滤器过滤后， 如果参数forAll为true， 则会返回所有满足过滤
 * 条件的节点集合， 否则， 返回满足条件的节点集合中的第一个节点
 * @method filterNodeList
 * @param { Array } nodeList 需要过滤的节点数组
 * @param { Function } fn 过滤器， 对符合条件的节点， 执行结果返回true， 反之则返回false
 * @param { Boolean } forAll 是否返回整个节点数组, 如果该参数为false， 则返回节点集合中的第一个节点
 * @return { Array | Node | NULL } 如果找到符合过滤条件的节点， 则根据参数forAll的值决定返回满足
 *                                      过滤条件的节点数组或第一个节点， 否则返回NULL
 * @example
 * ```javascript
 * var divNodes = document.getElementsByTagName("div");
 * divNodes = [].slice.call( divNodes, 0 );
 *
 * //output: 3（假定有3个div）
 * console.log( divNodes.length );
 *
 * var nodes = UE.dom.domUtils.filterNodeList( divNodes, function ( node ) {
 *     return node.tagName.toLowerCase() === 'div';
 * }, true );
 *
 * //output: 3
 * console.log( nodes.length );
 *
 * var node = UE.dom.domUtils.filterNodeList( divNodes, function ( node ) {
 *     return node.tagName.toLowerCase() === 'div';
 * }, false );
 *
 * //output: div
 * console.log( node.nodeName );
 * ```
 */

export default function (nodelist, filter, forAll) {
  let results = [];
  if (!utils.isFunction(filter)) {
    let str = filter;
    filter = function (n) {
      return (
        utils.indexOf(
          utils.isArray(str) ? str : str.split(' '),
          n.tagName.toLowerCase()
        ) != -1
      );
    };
  }
  utils.each(nodelist, function (n) {
    filter(n) && results.push(n);
  });
  return results.length == 0
    ? null
    : results.length == 1 || !forAll
    ? results[0]
    : results;
}
