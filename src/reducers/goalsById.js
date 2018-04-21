import {
  CREATE_GOAL,
  DELETE_GOAL,
  EDIT_GOAL,
  COMPLETE_GOAL,
  ADD_STEP,
  REMOVE_STEP
} from '../actions/types';
import { formattedDate } from '../utils';

function goal(state = {}, action) {
  switch(action.type) {
    case CREATE_GOAL:
      return {
        id: action.id,
        name: action.name,
        dueDate: action.dueDate,
        steps: [],
        completed: false,
        dateCreated: formattedDate(),
        description: action.description
      };
    case DELETE_GOAL:
      if (state.id !== action.id) return state;
      return null;
    case EDIT_GOAL:
      return {
          ...state,
          [action.what]: action.how
        };
      case COMPLETE_GOAL:
      return {
          ...state,
          completed: true
        };
      case ADD_STEP:
        return {
          ...state,
          steps: [...state.steps, action.id]
        };
      case REMOVE_STEP:
        return {
          ...state,
          steps: state.steps.filter(step => step !== action.id)
        };
    default:
      return state;
  }
}

function goalsById(state = {}, action) {
  switch(action.type) {
    case CREATE_GOAL:
      return {
        ...state,
        [action.id]: goal(undefined, action)
      };
    case DELETE_GOAL:
      return Object.keys(state).reduce((newState, id) => {
        const _goal = goal(state[id], action);
        _goal && (newState[id] = _goal);
        return newState;
      }, {});
    case EDIT_GOAL:
      if (!(state[action.id])) return state;
      return {
        ...state,
        [action.id]: goal(state[action.id], action)
      };
    case COMPLETE_GOAL:
    if (!(state[action.id])) return state;
      return {
        ...state,
        [action.id]: goal(state[action.id], action)
      };
    case ADD_STEP:
      // TODO: be sure to dispatch with the right `id`
      return {
        ...state,
        [action.goalId]: goal(state[action.goalId], action)
      };
    case REMOVE_STEP:
      return {
        ...state,
        [action.goalId]: goal(state[action.goalId], action)
      };
    default:
      return state;
  }
}

export default goalsById;
