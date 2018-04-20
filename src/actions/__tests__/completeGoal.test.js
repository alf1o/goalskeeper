import { COMPLETE_GOAL } from '../types';
import completeGoal from '../completeGoal';

describe('`completeGoal` action creator', () => {
  it('should create an action to complete a goal', () => {
    const id = 'id_0';
    const action = {
      type: COMPLETE_GOAL,
      id
    };
    expect(completeGoal(id)).toMatchObject(action);
  });

});
