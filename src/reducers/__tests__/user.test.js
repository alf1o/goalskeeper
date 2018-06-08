import user from '../user';
import { createUser } from '../../actions/createUser';
import { changeName } from '../../actions/changeUserName';

describe('`user` reducer', () => {
  it('should return the initial `state` when the `state` argument is `undefined`', () => {
    expect(user(undefined, {})).toMatchObject({});
  });

  it('should return the current `state` when the `action.type` is unknown', () => {
    const state = {
      id: 'user_0',
      name: 'Test',
      password: 'youllneverfindit',
      dateJoined: '28/04/2018'
    };

    expect(user(state, { type: 'UNKNOWN' })).toEqual(state);
  });

  it('should handle `CREATE_USER` action', () => {
    const id = 'id_0';
    const name = 'Timmy';
    const dateJoined = '07/06/2018';
    const action = createUser(id, name, dateJoined);
    const state = {
      id,
      name,
      dateJoined,
      goalsCompleted: []
    };
    expect(user({}, action)).toEqual(state);
  });

  it('should handle `CHANGE_NAME` action', () => {
    const initialState = {
      id: 'id_0',
      name: '',
      dateJoined: '08/06/2018',
      goalsCompleted: []
    };
    const name = 'Test';
    const action = changeName(name);
    const state = {
      id: 'id_0',
      name: 'Test',
      dateJoined: '08/06/2018',
      goalsCompleted: []
    };
    expect(user(initialState, action)).toEqual(state);
  });
});
