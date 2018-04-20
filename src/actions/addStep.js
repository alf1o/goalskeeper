import { ADD_STEP } from './types';

function addStep(id, content = '') {
  return {
    type: ADD_STEP,
    id,
    content
  };
}

export default addStep;

/*
  {
    type,
    id,
    content
  }
*/
