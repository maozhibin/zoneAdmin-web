import { browserHistory } from 'react-router';

export default store => next => action => {
    next(action);
};