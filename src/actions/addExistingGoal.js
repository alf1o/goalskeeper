import { ADD_EXISTING_GOAL, ADD_EXISTING_STEP } from './types';
import { retrieveData } from '../indexedDButils';

function addExistingGoal(goal) {
  return {
    type: ADD_EXISTING_GOAL,
    goal
  };
}

function addExistingStep(step) {
  return {
    type: ADD_EXISTING_STEP,
    step
  };
}

function addExistingGoalThunk() {
  return async function(dispatch) {
    const [goals, steps] = await Promise.all([
      retrieveData('goals'),
      retrieveData('steps')
    ]);
    // `steps` must be added before `goals`, else `components/Goals.js` throws an
    // error trying to read the (not yet added) `steps` from the `state`.
    steps.forEach(step => dispatch(addExistingStep(step)));
    goals.forEach(goal => dispatch(addExistingGoal(goal)));
    return;
  };
}

export default addExistingGoalThunk;
