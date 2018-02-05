import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import userReducer from './user';
import tableReducer from './table';
import twitterReducer from  './twitter';
import cyLableReducer from  './cylable';
const rootReducer = combineReducers({
  routing,
  userReducer,
  tableReducer,
  twitterReducer,
  cyLableReducer
});

export default rootReducer;
