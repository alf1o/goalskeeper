import { COMPLETE_GOAL } from './types';

function completeGoal(id) {
  return {
    type: COMPLETE_GOAL,
    id
  };
}

export default completeGoal;

/*
  {
    type,
    id
  }
*/
