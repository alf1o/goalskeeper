import { LOG_OUT } from './types';

function logout(id) {
  return {
    type: LOG_OUT,
    id
  };
}

export default logout;

/*
  {
    type,
    id
  }
*/
