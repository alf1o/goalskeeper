import { COMPLETE_STEP } from './types';

function completeStep(id) {
  return {
    type: COMPLETE_STEP,
    id
  };
}

export default completeStep;

/*
  {
    type,
    id
  }
*/
