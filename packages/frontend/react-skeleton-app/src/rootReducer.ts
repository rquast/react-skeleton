import { combineReducers } from 'redux';
// import {TodoListReducer} from '../todos/reducers/todoReducer'

//One root reducer for the whole app. This is done so that the app will have one single reducer to manage lots of other resources.
// And also communication between the reducers will be easier to maintain.

// TODO: follow examples from https://github.com/rquast/react-large-project-example-ts/blob/master/src/services/reducer.ts

const rootReducer = combineReducers({
  // todos: TodoListReducer
});

export default rootReducer;
