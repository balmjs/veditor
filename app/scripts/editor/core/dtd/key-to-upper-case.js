export default function (s) {
  for (let k in s) {
    s[k.toUpperCase()] = s[k];
  }
  return s;
}
