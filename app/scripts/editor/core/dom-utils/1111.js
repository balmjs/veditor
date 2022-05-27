/**
 * Dom操作工具包
 * @file
 * @module UE.dom.domUtils
 * @since 1.2.6.1
 */

/**
 * Dom操作工具包
 * @unfile
 * @module UE.dom.domUtils
 */
var attrFix =
    ie && browser.version < 9
      ? {
          tabindex: 'tabIndex',
          readonly: 'readOnly',
          for: 'htmlFor',
          class: 'className',
          maxlength: 'maxLength',
          cellspacing: 'cellSpacing',
          cellpadding: 'cellPadding',
          rowspan: 'rowSpan',
          colspan: 'colSpan',
          usemap: 'useMap',
          frameborder: 'frameBorder'
        }
      : {
          tabindex: 'tabIndex',
          readonly: 'readOnly'
        },
  styleBlock = utils.listToMap([
    '-webkit-box',
    '-moz-box',
    'block',
    'list-item',
    'table',
    'table-row-group',
    'table-header-group',
    'table-footer-group',
    'table-row',
    'table-column-group',
    'table-column',
    'table-cell',
    'table-caption'
  ]);
var domUtils = (dom.domUtils = {
  /**
   * 检测节点是否是UEditor所使用的辅助节点
   * @method isCustomeNode
   * @private
   * @param { Node } node 需要检测的节点
   * @remind 辅助节点是指编辑器要完成工作临时添加的节点， 在输出的时候将会从编辑器内移除， 不会影响最终的结果。
   * @return { Boolean } 给定的节点是否是一个辅助节点
   */
  isCustomeNode: function (node) {
    return node.nodeType == 1 && node.getAttribute('_ue_custom_node_');
  },

  /**
   * 检测节点的标签是否是给定的标签
   * @method isTagNode
   * @param { Node } node 需要检测的节点对象
   * @param { String } tagName 标签
   * @return { Boolean } 节点的标签是否是给定的标签
   * @example
   * ```html
   * <div id="test"></div>
   *
   * <script>
   *
   *     //output: true
   *     console.log( UE.dom.domUtils.isTagNode( document.getElementById("test"), "div" ) );
   *
   * </script>
   * ```
   */
  isTagNode: function (node, tagNames) {
    return (
      node.nodeType == 1 &&
      new RegExp('\\b' + node.tagName + '\\b', 'i').test(tagNames)
    );
  },

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
  filterNodeList: function (nodelist, filter, forAll) {
    var results = [];
    if (!utils.isFunction(filter)) {
      var str = filter;
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
  },

  /**
   * 查询给定的range选区是否在给定的node节点内，且在该节点的最末尾
   * @method isInNodeEndBoundary
   * @param { UE.dom.Range } rng 需要判断的range对象， 该对象的startContainer不能为NULL
   * @param node 需要检测的节点对象
   * @return { Number } 如果给定的选取range对象是在node内部的最末端， 则返回1, 否则返回0
   */
  isInNodeEndBoundary: function (rng, node) {
    var start = rng.startContainer;
    if (start.nodeType == 3 && rng.startOffset != start.nodeValue.length) {
      return 0;
    }
    if (start.nodeType == 1 && rng.startOffset != start.childNodes.length) {
      return 0;
    }
    while (start !== node) {
      if (start.nextSibling) {
        return 0;
      }
      start = start.parentNode;
    }
    return 1;
  },
  isBoundaryNode: function (node, dir) {
    var tmp;
    while (!domUtils.isBody(node)) {
      tmp = node;
      node = node.parentNode;
      if (tmp !== node[dir]) {
        return false;
      }
    }
    return true;
  },
  fillHtml: browser.ie11below ? '&nbsp;' : '<br/>'
});
var fillCharReg = new RegExp(domUtils.fillChar, 'g');
