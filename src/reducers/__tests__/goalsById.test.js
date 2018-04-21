import createGoal from '../../actions/createGoal';
import deleteGoal from '../../actions/deleteGoal';
import goalsById from '../goalsById';
import { deepFreeze, formattedDate } from '../../utils';

describe('`goalsById` reducer', () => {
  const initialState = {
    id_0: {
      id: 'id_0',
      name: 'Test goal',
      dueDate: '11/11/2018',
      steps: [],
      completed: false,
      dateCreated: '04/04/2018',
      description: ''
    }
  };
  deepFreeze(initialState);

  it('should return the initial `state` when the `state` argument is `undefined`', () => {
    expect(goalsById(undefined, {})).toMatchObject({});
  });

  it('should return the current `state` when the `action.type` is unknown', () => {
    expect(goalsById(initialState, {})).toEqual(initialState);
  });

  it('should handle `CREATE_GOAL`', () => {
    const action1 = createGoal('id_1', 'Easy goal', '12/07/2018', 'Start small');
    const state = goalsById(initialState, action1);
    let expected = {
      ...initialState,
      id_1: {
        id: 'id_1',
        name: 'Easy goal',
        dueDate: '12/07/2018',
        steps: [],
        completed: false,
        dateCreated: formattedDate(),
        description: 'Start small'
      }
    };
    expect(state).toEqual(expected);

    deepFreeze(state);

    const action2 = createGoal('id_2', 'Medium goal', '01/01/2019', 'Build up');
    const newState = goalsById(state, action2);
    expected = {
      ...state,
      id_2: {
        id: 'id_2',
        name: 'Medium goal',
        dueDate: '01/01/2019',
        steps: [],
        completed: false,
        dateCreated: formattedDate(),
        description: 'Build up'
      }
    };
    expect(newState).toEqual(expected);
  });

  it('should hande `DELETE_GOAL`', () => {
    const state1 = {
      ...initialState,
      id_1: {
        id: 'id_1',
        name: 'Easy goal',
        dueDate: '12/07/2018',
        steps: [],
        completed: false,
        dateCreated: formattedDate(),
        description: 'Start small'
      }
    };
    deepFreeze(state1);

    const action1 = deleteGoal('id_0');
    const state2 = goalsById(state1, action1);
    const expected = {
      id_1: {
        id: 'id_1',
        name: 'Easy goal',
        dueDate: '12/07/2018',
        steps: [],
        completed: false,
        dateCreated: formattedDate(),
        description: 'Start small'
      }
    };
    expect(expected).toEqual(state2);

    deepFreeze(state2);

    const action2 = deleteGoal('id_1');
    const state3 = goalsById(state2, action2);
    expect({}).toEqual(state3);

    const actionForNotFoundId = deleteGoal('not_found');
    const stateForNotFoundId = goalsById(state2, actionForNotFoundId);
    expect(state2).toEqual(stateForNotFoundId);
  });

});
