import {combineReducers} from 'redux';
import {buildReduce} from 'caoh5-util';

const user = buildReduce({
  USER_UPDATE: (state, action) => {
    return Object.assign({}, state, action.data);
  }
}, {
  id: '',
  token: '',
  name: '',
  photo: '',
  phone: ''
});


const userReducer = combineReducers({
  user,
});

export default userReducer;
