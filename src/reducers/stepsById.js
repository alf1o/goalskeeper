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
    case REMOVE_STEP:
      if (state.id !== action.id) return state;
      return null;
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
    case REMOVE_STEP:
      return Object.keys(state).reduce((newState, stepId) => {
        const _step = step(state[stepId], action);
        _step && (newState[stepId] = _step);
        return newState;
      }, {});
    default:
      return state;
  }
}

export default stepsById;
