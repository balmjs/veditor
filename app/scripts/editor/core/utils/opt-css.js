/**
 * 只针对border,padding,margin做了处理，因为性能问题
 * @public
 * @function
 * @param {String}    val style字符串
 */

export default function (val) {
  let padding, margin, border;
  val = val.replace(
    /(padding|margin|border)\-([^:]+):([^;]+);?/gi,
    function (str, key, name, val) {
      if (val.split(' ').length == 1) {
        switch (key) {
          case 'padding':
            !padding && (padding = {});
            padding[name] = val;
            return '';
          case 'margin':
            !margin && (margin = {});
            margin[name] = val;
            return '';
          case 'border':
            return val == 'initial' ? '' : str;
        }
      }
      return str;
    }
  );

  const opt = function (obj, name) {
    if (!obj) {
      return '';
    }
    let t = obj.top,
      b = obj.bottom,
      l = obj.left,
      r = obj.right,
      val = '';
    if (!t || !l || !b || !r) {
      for (let p in obj) {
        val += ';' + name + '-' + p + ':' + obj[p] + ';';
      }
    } else {
      val +=
        ';' +
        name +
        ':' +
        (t == b && b == l && l == r
          ? t
          : t == b && l == r
          ? t + ' ' + l
          : l == r
          ? t + ' ' + l + ' ' + b
          : t + ' ' + r + ' ' + b + ' ' + l) +
        ';';
    }
    return val;
  };

  val += opt(padding, 'padding') + opt(margin, 'margin');
  return val
    .replace(/^[ \n\r\t;]*|[ \n\r\t]*$/, '')
    .replace(/;([ \n\r\t]+)|\1;/g, ';')
    .replace(/(&((l|g)t|quot|#39))?;{2,}/g, function (a, b) {
      return b ? b + ';;' : ';';
    });
}
