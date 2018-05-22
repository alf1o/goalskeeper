import { CREATE_GOAL } from './types';
import { formattedDate } from '../utils';
import { addData } from '../indexedDButils';

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

function createGoalThunk(id, name = '', dueDate = null, description = '') {
  return function(dispatch) {
    addData(
      'goals',
      {
        id,
        name,
        dueDate,
        description,
        dateCreated: formattedDate(),
        steps: [],
        completed: false
      }
    );
    return dispatch(createGoal(id, name, dueDate, description));
  };
}

export { createGoal };
export default createGoalThunk;
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
