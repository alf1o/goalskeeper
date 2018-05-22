import { DELETE_GOAL } from './types';
import { deleteOne } from '../indexedDButils';

function deleteGoal(id) {
  return {
    type: DELETE_GOAL,
    id
  };
}

function deleteGoalThunk(id) {
  return function(dispatch) {
    deleteOne('goals', id);
    return dispatch(deleteGoal(id));
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
