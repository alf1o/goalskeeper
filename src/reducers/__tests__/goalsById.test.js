import createGoal from '../../actions/createGoal';
import deleteGoal from '../../actions/deleteGoal';
import editGoal from '../../actions/editGoal';
import completeGoal from '../../actions/completeGoal';
import addStep from '../../actions/addStep';
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
    expect(state2).toEqual(expected);

    deepFreeze(state2);

    const action2 = deleteGoal('id_1');
    const state3 = goalsById(state2, action2);
    expect({}).toEqual(state3);

    const actionForNotFoundId = deleteGoal('not_found');
    const stateForNotFoundId = goalsById(state2, actionForNotFoundId);
    expect(state2).toEqual(stateForNotFoundId);
  });

  it('should handle `EDIT_GOAL`', () => {
    const actionNotFoundId = editGoal('not_found', 'name', 'test name');
    const state = goalsById(initialState, actionNotFoundId);
    expect(state).toEqual(initialState);

    const actionEditName = editGoal('id_0', 'name', 'new name new life');
    const stateEditName = goalsById(initialState, actionEditName);
    let expected = {
      id_0: {
        id: 'id_0',
        name: 'new name new life',
        dueDate: '11/11/2018',
        steps: [],
        completed: false,
        dateCreated: '04/04/2018',
        description: ''
      }
    };
    expect(stateEditName).toEqual(expected);

    deepFreeze(stateEditName);

    const actionEditDate = editGoal('id_0', 'dueDate', '19/10/2018');
    const stateEditDate = goalsById(stateEditName, actionEditDate);
    expected = {
      id_0: {
        id: 'id_0',
        name: 'new name new life',
        dueDate: '19/10/2018',
        steps: [],
        completed: false,
        dateCreated: '04/04/2018',
        description: ''
      }
    };
    expect(stateEditDate).toEqual(expected);

    deepFreeze(stateEditDate);

    const actionEditDescription = editGoal('id_0', 'description', 'A goal needs a plan');
    const stateEditDescription = goalsById(stateEditDate, actionEditDescription);
    expected = {
      id_0: {
        id: 'id_0',
        name: 'new name new life',
        dueDate: '19/10/2018',
        steps: [],
        completed: false,
        dateCreated: '04/04/2018',
        description: 'A goal needs a plan'
      }
    };
    expect(stateEditDescription).toEqual(expected);
  });

  it('should handle `COMPLETE_GOAL`', () => {
    const actionNotFoundId = completeGoal('not_found');
    const stateNotFoundId = goalsById(initialState, actionNotFoundId);
    expect(stateNotFoundId).toEqual(initialState);

    const action = completeGoal('id_0');
    const state = goalsById(initialState, action);
    const expected = {
      id_0: {
        id: 'id_0',
        name: 'Test goal',
        dueDate: '11/11/2018',
        steps: [],
        completed: true,
        dateCreated: '04/04/2018',
        description: ''
      }
    };
    expect(state).toEqual(expected);
  });

  it('should handle `ADD_STEP`', () => {
    const action1 = addStep('id_0', 'step_1', 'First step');
    const state1 = goalsById(initialState, action1);
    let expected = {
      id_0: {
        id: 'id_0',
        name: 'Test goal',
        dueDate: '11/11/2018',
        steps: ['step_1'],
        completed: false,
        dateCreated: '04/04/2018',
        description: ''
      }
    };
    expect(state1).toEqual(expected);

    deepFreeze(state1);

    const action2 = addStep('id_0', 'step_2', 'Second step');
    const state2 = goalsById(state1, action2);
    expected = {
      id_0: {
        id: 'id_0',
        name: 'Test goal',
        dueDate: '11/11/2018',
        steps: ['step_1', 'step_2'],
        completed: false,
        dateCreated: '04/04/2018',
        description: ''
      }
    };
    expect(state2).toEqual(expected);
  });

});
