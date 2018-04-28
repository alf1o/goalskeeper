import { SIGN_UP } from './types';
import { formattedDate } from '../utils';

function signup(id, name, password, dateJoined) {
  return {
    type: SIGN_UP,
    id,
    name,
    password,
    dateJoined
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
