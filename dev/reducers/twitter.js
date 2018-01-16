import {combineReducers} from 'redux';
import {buildReduce} from 'caoh5-util';

const twitterList = buildReduce({
    TWITTERLIST: (state, action) => {
    return Object.assign({}, state, action.data);
  }
}, {
  list: [],
  total: 0,
});

const twitterReducer = combineReducers({
    twitterList,
});

export default twitterReducer;
