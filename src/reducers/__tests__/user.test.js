import signup from '../../actions/signup';
import login from '../../actions/login';
import logout from '../../actions/logout';
import user from '../user';
import { formattedDate, deepFreeze } from '../../utils';

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

  it('should handle the `SIGN_UP` action', () => {
    const id = 'user_0';
    const name = 'Test';
    const password = 'hidenseek';
    const action = signup(id, name, password);

    const state = {
      id,
      name,
      password,
      dateJoined: formattedDate(),
      isLogged: true
    };

    expect(user(undefined, action)).toEqual(state);
  });

});
