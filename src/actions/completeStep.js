import { COMPLETE_STEP } from './types';

function completeStep(id, completed) {
  return {
    type: COMPLETE_STEP,
    id,
    completed
  };
}

export default completeStep;

/*
  {
    type,
    id,
    completed
  }
*/
