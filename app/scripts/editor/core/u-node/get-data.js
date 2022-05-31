/**
 * 获取当前对象的data属性
 * @method getData
 * @return { Object } 若节点的type值是elemenet，返回空字符串，否则返回节点的data属性
 * @example
 * ```javascript
 * node.getData();
 * ```
 */
export default function getData() {
  if (this.type == 'element') return '';
  return this.data;
}
