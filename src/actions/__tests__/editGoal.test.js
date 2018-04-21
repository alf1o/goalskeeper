import { EDIT_GOAL } from '../types';
import editGoal from '../editGoal';

describe('`editGoal` action creator', () => {
  it('should return an action to edit a specific goal', () => {
    const id = 'id_0';

    let action = {
      type: EDIT_GOAL,
      id,
      what: 'dueDate',
      how: '15/11/2018'
    };
    expect(editGoal(id, 'dueDate', '15/11/2018')).toMatchObject(action);

    action = {
      type: EDIT_GOAL,
      id,
      what: 'name',
      how: 'Test goal'
    };
    expect(editGoal(id, 'name', 'Test goal')).toMatchObject(action);

    action = {
      type: EDIT_GOAL,
      id,
      what: 'description',
      how: 'Test description'
    };
    expect(editGoal(id, 'description', 'Test description')).toMatchObject(action);
  });

});
