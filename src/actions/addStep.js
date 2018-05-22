import { ADD_STEP } from './types';
import { addData } from '../indexedDButils';

function addStep(goalId, id, content = '') {
  return {
    type: ADD_STEP,
    goalId,
    id,
    content
  };
}

function addStepThunk(goalId, id, content = '') {
  return function(dispatch) {
    addData('steps', {
      id,
      content,
      completed: false,
      dateCompleted: null,
      goalId
    });
    return dispatch(addStep(goalId, id, content));
  };
}

export { addStep };
export default addStepThunk;

/*
  {
    type,
    goalId,
    id,
    content
  }
*/
