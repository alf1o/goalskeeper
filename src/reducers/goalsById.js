import {
  CREATE_GOAL,
  DELETE_GOAL,
  EDIT_GOAL,
  COMPLETE_GOAL
} from '../actions/types';
import { formattedDate } from '../utils';

function goalsById(state = {}, action) {
  switch(action.type) {
    case CREATE_GOAL:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          name: action.name,
          dueDate: action.dueDate,
          steps: [],
          completed: false,
          dateCreated: formattedDate(),
          description: action.description
        }
      };
    default:
      return state;
  }
}

export default goalsById;
