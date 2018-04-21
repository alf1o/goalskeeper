import { REMOVE_STEP } from './types';

function removeStep(goalId, id) {
  return {
    type: REMOVE_STEP,
    goalId,
    id
  };
}

export default removeStep;

/*
  {
    type,
    goalId,
    id
  }
*/
