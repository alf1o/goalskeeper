import { COMPLETE_STEP } from './types';
import { modifyData } from '../indexedDButils';

function completeStep(id, completed) {
  return {
    type: COMPLETE_STEP,
    id,
    completed
  };
}

function completeStepThunk(id, completed) {
  return function(dispatch) {
    modifyData('steps', id, { completed });
    return dispatch(completeStep(id, completed));
  };
}

export { completeStep };
export default completeStepThunk;

/*
  {
    type,
    id,
    completed
  }
*/
