import keyToUpperCase from './key-to-upper-case';
import extend2 from '../utils/extend2';
import G from './g';

export default extend2(
  keyToUpperCase({
    sub: 1,
    img: 1,
    embed: 1,
    object: 1,
    sup: 1,
    basefont: 1,
    map: 1,
    applet: 1,
    font: 1,
    big: 1,
    small: 1
  }),
  G
);
