import { CREATE_GOAL, DELETE_GOAL } from '../actions/types';

function goals(state = [], action) {
  switch(action.type) {
    case CREATE_GOAL:
      return [
        ...state,
        action.id
      ];
    case DELETE_GOAL:
      return state.filter(goalId => goalId !== action.id);
    default:
      return state;
  }
}

export default goals;
