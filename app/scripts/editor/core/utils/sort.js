const defalutCompareFn = function (item1, item2) {
  return item1.localeCompare(item2);
};

export default function (array, compareFn = defalutCompareFn) {
  for (let i = 0, len = array.length; i < len; i++) {
    for (let j = i, length = array.length; j < length; j++) {
      if (compareFn(array[i], array[j]) > 0) {
        let t = array[i];
        array[i] = array[j];
        array[j] = t;
      }
    }
  }
  return array;
}
