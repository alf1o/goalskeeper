import { REMOVE_STEP } from '../types';
import removeStep from '../removeStep';

describe('`removeStep` action creator', () => {
  it('should return an action to remove a step', () => {
    const goalId = 'id_0';
    const id = 'step_1';
    const action = {
      type: REMOVE_STEP,
      goalId,
      id
    };
    expect(removeStep(goalId, id)).toMatchObject(action);
  });

});
