import { LOG_OUT } from '../types';
import logout from '../logout';

describe('`logout` action creator', () => {
  it('should create an action to logout the user', () => {
    const id = 'user_0';

    const action = {
      type: LOG_OUT,
      id
    };

    expect(logout(id)).toMatchObject(action);
  });

});
