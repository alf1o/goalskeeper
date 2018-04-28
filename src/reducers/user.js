import { SIGN_UP, LOG_IN, LOG_OUT } from '../actions/types';

function user(state = {}, action) {
  switch(action.type) {
    case SIGN_UP:
      return {
        id: action.id,
        name: action.name,
        password: action.password,
        dateJoined: action.dateJoined,
        isLogged: true
      };
    default:
      return state;
  }
}

export default user;
