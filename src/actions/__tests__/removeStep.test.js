import { REMOVE_STEP } from '../types';
import removeStep from '../removeStep';

describe('`removeStep` action creator', () => {
  it('should return an action to remove a step', () => {
    const id = 'id_0';
    const action = {
      type: REMOVE_STEP,
      id
    };
    expect(removeStep(id)).toMatchObject(action);
  });

});
