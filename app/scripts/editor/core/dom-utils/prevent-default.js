/**
 * 阻止事件默认行为
 * @method preventDefault
 * @param { Event } evt 需要阻止默认行为的事件对象
 * @example
 * ```javascript
 * UE.dom.domUtils.preventDefault( evt );
 * ```
 */

export default function (evt) {
  evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
}
