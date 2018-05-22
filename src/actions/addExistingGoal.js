import { ADD_EXISTING_GOAL } from './types';
import { retrieveGoals } from '../indexedDButils';

function addExistingGoal(goal) {
  return {
    type: ADD_EXISTING_GOAL,
    goal
  };
}

function addExistingGoalThunk() {
  return async function(dispatch) {
    const goals = await retrieveGoals();
    goals.forEach(goal => dispatch(addExistingGoal(goal)));
  };
}

export default addExistingGoalThunk;
