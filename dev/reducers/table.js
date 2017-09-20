import {combineReducers} from 'redux';
import {buildReduce} from 'caoh5-util';

const table = buildReduce({
  TABLE_UPDATE: (state, action) => {
    return Object.assign({}, state, action.data);
  }
}, {
  list: [],
  total: 0,
});


const tableReducer = combineReducers({
  table,
});

export default tableReducer;
