import { CREATE_GOAL } from './types';

function createGoal(id, name = '', dueDate = null, description = '') {
  return {
    type: CREATE_GOAL,
    id,
    name,
    dateCreated: Date.now(),
    dueDate,
    description
  };
}

export default createGoal;
/*
  {
    type,
    id,
    name,
    dateCreated,
    dueDate,
    description
  }
*/
