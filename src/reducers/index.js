import photosList from './photosList';
import query from './query';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    photosList,
    query
});

export default reducers;
