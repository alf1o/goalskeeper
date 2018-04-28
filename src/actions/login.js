import { LOG_IN } from './types';

function login(name, password) {
  return {
    type: LOG_IN,
    name,
    password
  };
}

export default login;

/*
  {
    type,
    name,
    password
  }
*/
