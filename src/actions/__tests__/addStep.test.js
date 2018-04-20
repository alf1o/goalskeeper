import { ADD_STEP } from '../types';
import addStep from '../addStep';

describe('`addStep` action creator', () => {
  it('should create an action to add a step', () => {
    const id = 'id_0';
    const content = 'Test step';
    const action = {
      type: ADD_STEP,
      id,
      content
    };
    expect(addStep(id, content)).toMatchObject(action);
  });

});
