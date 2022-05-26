export default function (obj) {
  for (var p in obj) {
    if (obj[p] === '') {
      delete obj[p];
    }
  }
  return obj;
}
