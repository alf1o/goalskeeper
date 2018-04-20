import { CREATE_GOAL } from '../types';
import createGoal from '../createGoal';

describe('`creatGoal` action creator', () => {
  it('should return an action to create a new goal', () => {
    const goal = {
      id: 'id_0',
      name: 'Impossible goal',
      dateCreated: Date.now(),
      dueDate: null,
      description: 'No way to achieve it'
    };
    const action = {
      type: CREATE_GOAL,
      goal
    };
    expect(createGoal(goal)).toMatchObject(action);
  });

});
