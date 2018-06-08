import { addStep } from '../../actions/addStep';
import { removeStep } from '../../actions/removeStep';
import { completeStep } from '../../actions/completeStep';
import stepsById from '../stepsById';
import { deepFreeze, formattedDate } from '../../utils';

describe('`stepsByid` reducer', () => {
  const initialState = {
    step_1: {
      id: 'step_1',
      content: 'Test step #1',
      completed: false,
      dateCompleted: null,
      goalId: 'id_0'
    },
    step_2: {
      id: 'step_2',
      content: 'Test step #2',
      completed: false,
      dateCompleted: null,
      goalId: 'id_0'
    }
  };
  deepFreeze(initialState);

  it('should return the initial `state` when the `state` argument is `undefined`', () => {
    expect(stepsById(undefined, {})).toMatchObject({});
  });

  it('should return the current `state` when the `action.type` is unknown', () => {
    expect(stepsById(initialState, { type: 'UNKNOWN' })).toMatchObject(initialState);
  });

  it('should handle `ADD_STEP`', () => {
    const action1 = addStep('id_1', 'step_3', 'Test step #3');
    let expected = {
      step_3: {
        id: 'step_3',
        content: 'Test step #3',
        completed: false,
        dateCompleted: null,
        goalId: 'id_1'
      }
    };
    expect(stepsById({}, action1)).toEqual(expected);

    const state1 = stepsById(initialState, action1);
    expected = {
      ...initialState,
      step_3: {
        id: 'step_3',
        content: 'Test step #3',
        completed: false,
        dateCompleted: null,
        goalId: 'id_1'
      }
    };
    expect(state1).toEqual(expected);

    deepFreeze(state1);

    const action2 = addStep('id_0', 'step_4', 'Test step #4');
    const state2 = stepsById(state1, action2);
    expected = {
      ...state1,
      step_4: {
        id: 'step_4',
        content: 'Test step #4',
        completed: false,
        dateCompleted: null,
        goalId: 'id_0'
      }
    };
    expect(state2).toEqual(expected);
  });

  it('should handle `REMOVE_STEP`', () => {
    const actionNotFound = removeStep('not_found', 'id_0');
    expect(stepsById(initialState, actionNotFound)).toEqual(initialState);

    const action1 = removeStep('step_1', 'id_0');
    const state1 = stepsById(initialState, action1);
    let expected = {
      step_2: {
        id: 'step_2',
        content: 'Test step #2',
        completed: false,
        dateCompleted: null,
        goalId: 'id_0'
      }
    };
    expect(state1).toEqual(expected);

    deepFreeze(state1);

    const action2 = removeStep('step_2', 'id_0');
    const state2 = stepsById(state1, action2);
    expect(state2).toEqual({});
  });

  it('should handle `COMPLETE_STEP`', () => {
    const actionNotFoundId = completeStep('not_found', true);
    const stateNotFoundId = stepsById(initialState, actionNotFoundId);
    expect(stateNotFoundId).toEqual(initialState);

    const action = completeStep('step_2', true);
    const state = stepsById(initialState, action);
    let expected = {
      step_1: {
        id: 'step_1',
        content: 'Test step #1',
        completed: false,
        dateCompleted: null,
        goalId: 'id_0'
      },
      step_2: {
        id: 'step_2',
        content: 'Test step #2',
        completed: true,
        dateCompleted: formattedDate(),
        goalId: 'id_0'
      }
    };
    expect(state).toEqual(expected);

    deepFreeze(state);

    const action2 = completeStep('step_2', false);
    const state2 = stepsById(state, action2);
    expected = {
      step_1: {
        id: 'step_1',
        content: 'Test step #1',
        completed: false,
        dateCompleted: null,
        goalId: 'id_0'
      },
      step_2: {
        id: 'step_2',
        content: 'Test step #2',
        completed: false,
        dateCompleted: null,
        goalId: 'id_0'
      }
    };
    expect(expected).toEqual(state2);
  });

});
