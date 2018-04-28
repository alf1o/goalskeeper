import { SIGN_UP } from '../types';
import signup from '../signup';
import { formattedDate } from '../../utils';

describe('`signup` action creator', () => {
  it('should return an action to create a new user', () => {
    const id = 'user_0';
    const name = 'Test';
    const password = 'unfathomable';
    const dateJoined = formattedDate();

    const action = {
      type: SIGN_UP,
      id,
      name,
      password,
      dateJoined
    };

    expect(signup(id, name, password)).toMatchObject(action);
  });

});
