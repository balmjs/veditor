import keyToUpperCase from './key-to-upper-case';
import extend2 from '../utils/extend2';
import block from './block';
import empty from './empty';
import A from './a';
import B from './b';
import C from './c';
import D from './d';
import E from './e';
import F from './f';
import G from './g';
import H from './h';
import I from './i';
import J from './j';
import K from './k';
import L from './l';
import M from './m';
import N from './n';
import O from './o';
import P from './p';
import Q from './q';
import R from './r';
import S from './s';
import T from './t';
import U from './u';
import V from './v';

/**
 * dtd html语义化的体现类
 * @constructor
 * @namespace dtd
 */

export default keyToUpperCase({
  // $ 表示自定的属性

  // body外的元素列表.
  $nonBodyContent: extend2(V, U, S),

  //块结构元素列表
  $block: block,

  //内联元素列表
  $inline: L,

  $inlineWithA: extend2(keyToUpperCase({ a: 1 }), L),

  $body: extend2(keyToUpperCase({ script: 1, style: 1 }), block),

  $cdata: keyToUpperCase({ script: 1, style: 1 }),

  //自闭和元素
  $empty: empty,

  //不是自闭合，但不能让range选中里边
  $nonChild: keyToUpperCase({ iframe: 1, textarea: 1 }),
  //列表元素列表
  $listItem: keyToUpperCase({ dd: 1, dt: 1, li: 1 }),

  //列表根元素列表
  $list: keyToUpperCase({ ul: 1, ol: 1, dl: 1 }),

  //不能认为是空的元素
  $isNotEmpty: keyToUpperCase({
    table: 1,
    ul: 1,
    ol: 1,
    dl: 1,
    iframe: 1,
    area: 1,
    base: 1,
    col: 1,
    hr: 1,
    img: 1,
    embed: 1,
    input: 1,
    link: 1,
    meta: 1,
    param: 1,
    h1: 1,
    h2: 1,
    h3: 1,
    h4: 1,
    h5: 1,
    h6: 1
  }),

  //如果没有子节点就可以删除的元素列表，像span,a
  $removeEmpty: keyToUpperCase({
    a: 1,
    abbr: 1,
    acronym: 1,
    address: 1,
    b: 1,
    bdo: 1,
    big: 1,
    cite: 1,
    code: 1,
    del: 1,
    dfn: 1,
    em: 1,
    font: 1,
    i: 1,
    ins: 1,
    label: 1,
    kbd: 1,
    q: 1,
    s: 1,
    samp: 1,
    small: 1,
    span: 1,
    strike: 1,
    strong: 1,
    sub: 1,
    sup: 1,
    tt: 1,
    u: 1,
    let: 1
  }),

  $removeEmptyBlock: keyToUpperCase({ p: 1, div: 1 }),

  //在table元素里的元素列表
  $tableContent: keyToUpperCase({
    caption: 1,
    col: 1,
    colgroup: 1,
    tbody: 1,
    td: 1,
    tfoot: 1,
    th: 1,
    thead: 1,
    tr: 1,
    table: 1
  }),
  //不转换的标签
  $notTransContent: keyToUpperCase({
    pre: 1,
    script: 1,
    style: 1,
    textarea: 1
  }),
  html: U,
  head: T,
  style: N,
  script: N,
  body: P,
  base: {},
  link: {},
  meta: {},
  title: N,
  col: {},
  tr: keyToUpperCase({ td: 1, th: 1 }),
  img: {},
  embed: {},
  colgroup: keyToUpperCase({ thead: 1, col: 1, tbody: 1, tr: 1, tfoot: 1 }),
  noscript: P,
  td: P,
  br: {},
  th: P,
  center: P,
  kbd: L,
  button: extend2(I, E),
  basefont: {},
  h5: L,
  h4: L,
  samp: L,
  h6: L,
  ol: Q,
  h1: L,
  h3: L,
  option: N,
  h2: L,
  form: extend2(A, D, E, I),
  select: keyToUpperCase({ optgroup: 1, option: 1 }),
  font: L,
  ins: L,
  menu: Q,
  abbr: L,
  label: L,
  table: keyToUpperCase({
    thead: 1,
    col: 1,
    tbody: 1,
    tr: 1,
    colgroup: 1,
    caption: 1,
    tfoot: 1
  }),
  code: L,
  tfoot: M,
  cite: L,
  li: P,
  input: {},
  iframe: P,
  strong: L,
  textarea: N,
  noframes: P,
  big: L,
  small: L,
  //trace:
  span: keyToUpperCase({
    '#': 1,
    br: 1,
    b: 1,
    strong: 1,
    u: 1,
    i: 1,
    em: 1,
    sub: 1,
    sup: 1,
    strike: 1,
    span: 1
  }),
  hr: L,
  dt: L,
  sub: L,
  optgroup: keyToUpperCase({ option: 1 }),
  param: {},
  bdo: L,
  let: L,
  div: P,
  object: O,
  sup: L,
  dd: P,
  strike: L,
  area: {},
  dir: Q,
  map: extend2(keyToUpperCase({ area: 1, form: 1, p: 1 }), A, F, E),
  applet: O,
  dl: keyToUpperCase({ dt: 1, dd: 1 }),
  del: L,
  isindex: {},
  fieldset: extend2(keyToUpperCase({ legend: 1 }), K),
  thead: M,
  ul: Q,
  acronym: L,
  b: L,
  a: extend2(keyToUpperCase({ a: 1 }), J),
  blockquote: extend2(keyToUpperCase({ td: 1, tr: 1, tbody: 1, li: 1 }), P),
  caption: L,
  i: L,
  u: L,
  tbody: M,
  s: L,
  address: extend2(D, I),
  tt: L,
  legend: L,
  q: L,
  pre: extend2(G, C),
  p: extend2(keyToUpperCase({ a: 1 }), L),
  em: L,
  dfn: L
});
