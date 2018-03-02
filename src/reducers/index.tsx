import { Todo } from '../types';
import { Action } from 'redux';
import { combineReducers, createStore } from 'redux';
import createHistory from 'history/createBrowserHistory';

enum Actions {
  CLOSE_TODO = 'CLOSE_TODO',
  CREATE_TODO = 'CREATE_TODO'
}

export interface TodoAction extends Action {
  readonly todoTitle?: string;
  readonly todoId?: string;
}

export const CloseTodo = (id: string): TodoAction => {
  return {
    type: Actions.CLOSE_TODO,
    todoId: id
  };
};

export const CreateTodo = (title: string): TodoAction => {
  return {
    type: Actions.CREATE_TODO,
    todoTitle: title
  };
};

/* Initial State */

const initialState = [
  { id: '1234567', title: 'Install Redux', completed: true},
  { id: '1234568', title: 'Run Linting', completed: false},
  { id: '1234569', title: 'Figure out TypeScript', completed: false}
];

const todosReducer = (state = initialState, action: TodoAction): Array<Todo> => {
  switch (action.type) {
    case Actions.CREATE_TODO:
      return state.concat([{
        id: Math.random().toString(36).substring(7),
        title: action.todoTitle || 'Todo',
        completed: false
      }]);
    case Actions.CLOSE_TODO:
      return state.map((todo: Todo) => {
        if (todo.id !== action.todoId) {
          return todo;
        }

        return {
          ...todo,
          completed: true
        };
      });
    default:
      return state;
  }
};

export const store = createStore(
  combineReducers({
    todos: todosReducer
  })
);

export const history = createHistory({ basename: '/' });
