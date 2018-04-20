import { DELETE_GOAL } from '../types';
import deleteGoal from '../deleteGoal';

describe('`deleteGoal` action creator', () => {
  it('should create an action to delete a goal', () => {
    const id = 'id_0';
    const action = {
      type: DELETE_GOAL,
      id
    };
    expect(deleteGoal(id)).toMatchObject(action);
  });

});
