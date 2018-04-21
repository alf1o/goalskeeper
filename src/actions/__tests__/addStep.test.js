import { ADD_STEP } from '../types';
import addStep from '../addStep';

describe('`addStep` action creator', () => {
  it('should create an action to add a step', () => {
    const goalId = 'id_0';
    const id = 'step_1';
    const content = 'Test step';
    const action = {
      type: ADD_STEP,
      goalId,
      id,
      content
    };
    expect(addStep(goalId, id, content)).toMatchObject(action);
  });

});
