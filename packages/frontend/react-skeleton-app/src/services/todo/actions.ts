import * as api from './api';
import { Dispatch } from 'redux';

import { Todo } from './models';

export const GET_ALL_REQUEST = 'services/todos/getAllRequest';
export type GET_ALL_REQUEST = typeof GET_ALL_REQUEST;
export const GET_ALL_SUCCESS = 'services/todos/getAllSuccess';
export type GET_ALL_SUCCESS = typeof GET_ALL_SUCCESS;
export const GET_ALL_FAILURE = 'services/todos/getAllFailure';
export type GET_ALL_FAILURE = typeof GET_ALL_FAILURE;

export type Actions =
  | {
      type: GET_ALL_REQUEST;
    }
  | {
      type: GET_ALL_SUCCESS;
      payload: Todo[];
    }
  | {
      type: GET_ALL_FAILURE;
      error: {};
    };

export const getTodos = () => (dispatch: Dispatch) => {
  dispatch<Actions>({
    type: GET_ALL_REQUEST
  });

  api
    .getTodos()
    .then(data => {
      dispatch<Actions>({
        type: GET_ALL_SUCCESS,
        payload: data.todos
      });
    })
    .catch(error => {
      dispatch<Actions>({
        type: GET_ALL_FAILURE,
        error
      });
    });
};
