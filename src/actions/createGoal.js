import { CREATE_GOAL } from './types';
import { formattedDate } from '../utils';

function createGoal(id, name = '', dueDate = null, description = '') {
  const dateCreated = formattedDate();
  return {
    type: CREATE_GOAL,
    id,
    name,
    dateCreated,
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
