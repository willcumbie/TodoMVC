import { init, Model, Models, Action } from '@rematch/core';
import { Store } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { Todo } from '../types';
import thunkMiddleware from 'redux-thunk';
import { reduxTodosReducer } from './redux_reducer';

const halfSecondWait = () => {
  return new Promise(resolve => {
    setTimeout(() => { resolve(); }, 500);
  });
};

const todos: Model = {
  name: 'todos',
  state: [
    { id: '1234567', title: 'Install Rematch', completed: true},
    { id: '1234568', title: 'Run Rematch Reducers in Parallel with Redux Reducers', completed: false},
    { id: '1234569', title: 'Figure out TypeScript', completed: false}
  ],
  reducers: {
    create: (state, title) => state.concat([{
        id: Math.random().toString(36).substring(7),
        title: title || 'Todo',
        completed: false
      }]),
    close: (state, id) => {
      return state.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, completed: true };
        }
        return todo;
      });
    }
  },
  effects: {
    asyncCreate: async function(this: TodoModel, title: string, state: Models) {
      await halfSecondWait();
      this.create(title);
    }
  }
};

export interface TodoModel extends Model {
  asyncCreate: (name: string) => Action;
  create: (name: string) => Action;
  close: (name: string) => Action;
}

export interface MyModels extends Models {
  todos: TodoModel;
}

export const store: Store<Models> = init({
  models: { todos },
  redux: {
    reducers: { reduxTodos: reduxTodosReducer },
    middlewares: [thunkMiddleware]
  }

});

export const history = createHistory({ basename: '/' });
