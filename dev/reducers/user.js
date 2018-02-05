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

const blackList = buildReduce({
  BLACKLIST: (state, action) => {
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
const cyLableCount = buildReduce({
  LABLECOUNT: (state, action) => {
    return Object.assign({}, state, action.data);
  }
}, {
  list: [],
});


const verifyInfo = buildReduce({
  VERIFY_INFO: (state, action) => {
    return Object.assign({}, state, action.data);
  }
}, {
  user:``
});
const userReducer = combineReducers({
  user,
  userList,
  applayList,
  verifyInfo,
  cyLableCount,
  blackList
});

export default userReducer;
