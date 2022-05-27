import extend2 from '../utils/extend2';
import keyToUpperCase from './key-to-upper-case';
import B from './b';

export default extend2(keyToUpperCase({ a: 1 }), B);
