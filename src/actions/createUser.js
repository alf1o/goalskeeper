import { CREATE_USER } from './types';
import { formattedDate } from '../utils';
import { addData } from '../indexedDButils';

function createUser(id, name = 'Anonymous', dateJoined, goalsCompleted = []) {
  return {
    type: CREATE_USER,
    id,
    name,
    dateJoined,
    goalsCompleted
  };
}

function createUserThunk(user, exists) {
  return function(dispatch) {
    const dateJoined = user.dateJoined || formattedDate();
    const name = user.name || 'Anonymous';
    const goalsCompleted = user.goalsCompleted || [];
    if (!exists) addData('user', { id: user.id, name, dateJoined, goalsCompleted });
    return dispatch(createUser(user.id, name, dateJoined, goalsCompleted));
  };
}

export { createUser };
export default createUserThunk;
