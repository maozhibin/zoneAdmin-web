import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import userReducer from './user';
import tableReducer from './table';

const rootReducer = combineReducers({
  routing,
  userReducer,
  tableReducer
});

export default rootReducer;
