import { CHANGE_NAME } from './types';
import { modifyData } from '../indexedDButils';

function changeName(name) {
  return {
    type: CHANGE_NAME,
    name
  };
}

function changeNameThunk(id, name) {
  return function(dispatch) {
    modifyData('user', id, { name });
    return dispatch(changeName(name));
  };
}

export { changeName };
export default changeNameThunk;
