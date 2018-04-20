import { CREATE_GOAL } from '../types';
import createGoal from '../createGoal';
import { formattedDate } from '../../utils';

describe('`creatGoal` action creator', () => {
  it('should return an action to create a new goal', () => {
    const id = 'id_0';
    const name = 'Impossible goal';
    const description = 'No way to achieve it';
    const dateCreated = formattedDate();
    const action = {
      type: CREATE_GOAL,
      id,
      name,
      dateCreated,
      dueDate: null,
      description
    };
    expect(createGoal(id, name, null, description)).toMatchObject(action);
  });

});
