import { REMOVE_STEP } from './types';

function removeStep(id) {
  return {
    type: REMOVE_STEP,
    id
  };
}

export default removeStep;

/*
  {
    type,
    id
  }
*/
