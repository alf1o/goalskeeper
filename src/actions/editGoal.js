import { EDIT_GOAL } from './types';

function editGoal(what = 'name', how = '') {
  return {
    type: EDIT_GOAL,
    [what]: how
  };
}

export default editGoal;

/*
  {
    type,
    name || dueDate
  }
*/
