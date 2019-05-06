import { combineReducers } from 'redux';
import { reducer as todoReducer } from './todo/reducer';

export const reducer = combineReducers({
  todo: todoReducer
});

export default reducer;
