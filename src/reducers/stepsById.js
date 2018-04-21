import { ADD_STEP, REMOVE_STEP, COMPLETE_STEP } from '../actions/types';

function step(state = {}, action) {
  switch(action.type) {
    case ADD_STEP:
      return {
        id: action.id,
        content: action.content,
        completed: false,
        dateCompleted: null,
        goalId: action.goalId
      };
    default:
      return state;
  }
}

function stepsById(state = {}, action) {
  switch(action.type) {
    case ADD_STEP:
      return {
        ...state,
        [action.id]: step(undefined, action)
      };
    default:
      return state;
  }
}

export default stepsById;
