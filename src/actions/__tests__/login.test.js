import { LOG_IN } from '../types';
import login from '../login';

describe('`login` action creator', () => {
  it('should return an action to login the user', () => {
    const name = 'Test';
    const password = 'unknown';

    const action = {
      type: LOG_IN,
      name,
      password
    };

    expect(login(name, password)).toMatchObject(action);
  });

});
