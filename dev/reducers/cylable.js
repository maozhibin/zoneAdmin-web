import {combineReducers} from 'redux';
import {buildReduce} from 'caoh5-util';

const cyLableAll = buildReduce({
  CYLABLEALL: (state, action) => {
    return Object.assign({}, state, action.data);
  }
}, {
  list: [],
  total: 0,
});


const cyLableReducer = combineReducers({
    cyLableAll,
});

export default cyLableReducer;
