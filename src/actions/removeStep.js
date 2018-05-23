import { REMOVE_STEP } from './types';
import { deleteOne, modifyData } from '../indexedDButils';

function removeStep(id, goalId) {
  return {
    type: REMOVE_STEP,
    id,
    goalId
  };
}

function removeStepThunk(id, goalId) {
  return function(dispatch) {
    deleteOne('steps', id);
    modifyData('goals', goalId, { steps: { remove: true, step: id } });
    return dispatch(removeStep(id, goalId))
  };
}

export { removeStep };
export default removeStepThunk;

/*
  {
    type,
    goalId,
    id
  }
*/
