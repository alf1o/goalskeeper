import { DELETE_GOAL } from './types';

function deleteGoal(id) {
  return {
    type: DELETE_GOAL,
    id
  };
}

export default deleteGoal;

/*
  {
    type,
    id
  }
*/
