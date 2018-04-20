import { CREATE_GOAL } from '../types';
import createGoal from '../createGoal';

describe('`creatGoal` action creator', () => {
  it('should return an action to create a new goal', () => {
    const id = 'id_0';
    const name = 'Impossible goal';
    const description = 'No way to achieve it';
    const action = {
      type: CREATE_GOAL,
      id,
      name,
      dateCreated: Date.now(),
      dueDate: null,
      description
    };
    expect(createGoal(id, name, null, description)).toMatchObject(action);
  });

});
