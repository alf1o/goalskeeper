import { EDIT_GOAL } from '../types';
import editGoal from '../editGoal';

describe('`editGoal` action creator', () => {
  it('should return an action to edit a specific goal', () => {
    const dueDate = '15/11/2018';
    let action = {
      type: EDIT_GOAL,
      dueDate
    };
    expect(editGoal('dueDate', dueDate)).toMatchObject(action);

    const name = 'Test goal';
    action = {
      type: EDIT_GOAL,
      name
    };
    expect(editGoal('name', name)).toMatchObject(action);
  });

});
