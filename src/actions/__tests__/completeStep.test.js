import { COMPLETE_STEP } from '../types';
import completeStep from '../completeStep';

describe('`completeStep` action creator', () => {
  it('should create a `COMPLETE_STEP` action', () => {
    const id = 'step_1';
    const action = {
      type: COMPLETE_STEP,
      id
    };
    expect(completeStep(id)).toMatchObject(action);
  });

});
