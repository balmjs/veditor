import extend2 from '../utils/extend2';
import keyToUpperCase from './key-to-upper-case';
import F from './f';

export default extend2(
  keyToUpperCase({
    b: 1,
    acronym: 1,
    bdo: 1,
    let: 1,
    '#': 1,
    abbr: 1,
    code: 1,
    br: 1,
    i: 1,
    cite: 1,
    kbd: 1,
    u: 1,
    strike: 1,
    s: 1,
    tt: 1,
    strong: 1,
    q: 1,
    samp: 1,
    em: 1,
    dfn: 1,
    span: 1
  }),
  F
);
