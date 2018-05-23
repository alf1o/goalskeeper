import { DELETE_GOAL } from './types';
import { deleteOne } from '../indexedDButils';

function deleteGoal(id) {
  return {
    type: DELETE_GOAL,
    id
  };
}

// TODO: check concurrent readwrite trs work fine.
function deleteGoalThunk(goal) {
  return function(dispatch) {
    deleteOne('goals', goal.id);
    goal.steps.forEach(stepId => deleteOne('steps', 'stepId'));
    return dispatch(deleteGoal(goal.id));
  };
}

export { deleteGoal };
export default deleteGoalThunk;

/*
  {
    type,
    id
  }
*/
