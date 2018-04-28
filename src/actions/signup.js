import { SIGN_UP } from './types';
import { formattedDate } from '../utils';

function signup(id, name, password) {
  return {
    type: SIGN_UP,
    id,
    name,
    password,
    dateJoined: formattedDate()
  };
}

export default signup;

/*
  {
    type,
    id,
    name,
    password,
    dateJoined
  }
*/
