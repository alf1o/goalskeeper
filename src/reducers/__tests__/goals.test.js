import createGoal from '../../actions/createGoal';
import deleteGoal from '../../actions/deleteGoal';
import goals from '../goals';
import { deepFreeze } from '../../utils';

describe('`goals` reducer', () => {
  const initialState = ['id_0', 'id_1', 'id_2'];
  deepFreeze(initialState);

  it('should return the initial `state` when the `state` argument is `undefined`', () => {
    expect(goals(undefined, {})).toMatchObject([]);
  });

  it('should return the current `state` when the `action.type` is unknown', () => {
    expect(goals(initialState, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  it('should handle `CREATE_GOAL`', () => {
    const action1 = createGoal('id_5', 'test name', '14/12/2018', '');
    const state = ['id_5'];
    expect(goals([], action1)).toEqual(state);

    const state1 = [...initialState, 'id_5'];
    expect(goals(initialState, action1)).toEqual(state1);

    deepFreeze(state1);

    const action2 = createGoal('id_9', 'nice name', '11/11/2019', '');
    const state2 = [...state1, 'id_9'];
    expect(goals(state1, action2)).toEqual(state2);
  });

  it('should handle `DELETE_GOAL`', () => {
    const actionNotFound = deleteGoal('not_found');
    expect(goals(initialState, actionNotFound)).toEqual(initialState);

    const action1 = deleteGoal('id_0');
    const state1 = ['id_1', 'id_2'];
    expect(goals(initialState, action1)).toEqual(state1);

    deepFreeze(state1);

    const action2 = deleteGoal('id_2');
    const state2 = ['id_1'];
    expect(goals(state1, action2)).toEqual(state2);
  });

});
