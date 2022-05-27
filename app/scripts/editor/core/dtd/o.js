import extend2 from '../utils/extend2';
import keyToUpperCase from './key-to-upper-case';
import K from './k';

export default extend2(keyToUpperCase({ param: 1 }), K);
