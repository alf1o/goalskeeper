import { CREATE_GOAL } from './types';

function createGoal(goal = {}) {
  return {
    type: CREATE_GOAL,
    goal
  };
}

export default createGoal;
/*
  {
    type,
    {
      id,
      name,
      dateCreated,
      dueDate,
      description
    }
  }
*/
