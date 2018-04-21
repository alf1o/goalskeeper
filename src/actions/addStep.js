import { ADD_STEP } from './types';

function addStep(goalId, id, content = '') {
  return {
    type: ADD_STEP,
    goalId,
    id,
    content
  };
}

export default addStep;

/*
  {
    type,
    goalId,
    id,
    content
  }
*/
