import extend2 from '../utils/extend2';
import keyToUpperCase from './key-to-upper-case';
import A from './a';
import D from './d';
import E from './e';
import I from './i';

export default extend2(keyToUpperCase({ form: 1 }), A, D, E, I);
