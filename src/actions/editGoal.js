import { EDIT_GOAL } from './types';

function editGoal(id, what = 'name', how = '') {
  return {
    type: EDIT_GOAL,
    id,
    what,
    how
  };
}

export { editGoal };

/*
  {
    type,
    id,
    what: (name || dueDate || description),
    how
  }
*/
