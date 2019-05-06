import { combineReducers, Reducer } from 'redux';
import { createSelector } from 'reselect';

import { Actions, GET_ALL_SUCCESS } from './actions';
import { Todo } from './models';

interface ByIdState {
  [index: string]: Todo;
}

type AllIdsState = string[];

export interface State {
  byId: ByIdState;
  allIds: AllIdsState;
}

const todosById: Reducer<ByIdState> = (state = {}, action: Actions) => {
  switch (action.type) {
    case GET_ALL_SUCCESS:
      const newState: any = {};
      action.payload.forEach(todo => {
        newState[todo.id] = todo;
      });
      return newState;
    default:
      return state;
  }
};

const allTodos: Reducer<AllIdsState> = (state = [], action: Actions) => {
  switch (action.type) {
    case GET_ALL_SUCCESS:
      return [...action.payload.map(todo => todo.id)];
    default:
      return state;
  }
};

export const reducer = combineReducers<State>({
  byId: todosById,
  allIds: allTodos
});

const byIdSelector = (state: State) => state.byId;

export const getAllTodos = createSelector(
  byIdSelector,
  ids => Object.keys(ids).map(key => ids[key])
);

export const getTodo = (state: State, id: string): Todo | undefined =>
  byIdSelector(state)[id];
