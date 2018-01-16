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
const userList = buildReduce({
  USERLIST: (state, action) => {
    return Object.assign({}, state, action.data);
  }
}, {
  list: [],
  total: 0,
});
const applayList = buildReduce({
  APPLIYLIST: (state, action) => {
    return Object.assign({}, state, action.data);
  }
}, {
  list: [],
  total: 0,
});

const userReducer = combineReducers({
  user,
  userList,
  applayList
});

export default userReducer;
