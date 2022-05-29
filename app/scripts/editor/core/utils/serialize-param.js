import types from './types';

export default function (json) {
  let strArr = [];
  for (let i in json) {
    //忽略默认的几个参数
    if (i == 'method' || i == 'timeout' || i == 'async') continue;
    //传递过来的对象和函数不在提交之列
    if (
      !(
        (typeof json[i]).toLowerCase() == 'function' ||
        (typeof json[i]).toLowerCase() == 'object'
      )
    ) {
      strArr.push(encodeURIComponent(i) + '=' + encodeURIComponent(json[i]));
    } else if (types.isArray(json[i])) {
      //支持传数组内容
      for (let j = 0; j < json[i].length; j++) {
        strArr.push(
          encodeURIComponent(i) + '[]=' + encodeURIComponent(json[i][j])
        );
      }
    }
  }
  return strArr.join('&');
}
