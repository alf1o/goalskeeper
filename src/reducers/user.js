import { CREATE_USER, CHANGE_NAME } from '../actions/types';

function user(state = {}, action) {
  switch(action.type) {
    case CREATE_USER:
      return {
        id: action.id,
        name: action.name,
        dateJoined: action.dateJoined,
        goalsCompleted: action.goalsCompleted
      };
    case CHANGE_NAME:
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  }
}

export default user;
