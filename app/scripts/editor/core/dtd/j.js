import extend2 from '../utils/extend2';
import keyToUpperCase from './key-to-upper-case';
import B from './b';
import H from './h';

export default extend2(keyToUpperCase({ iframe: 1 }), H, B);
