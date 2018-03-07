import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Todo } from '../../types';
import { TodoBox } from './TodoBox';
import { NewTodoForm } from './NewTodoForm';
import { Action } from '@rematch/core';
import { MyModels } from '../../reducers';
import { CloseTodo, CreateTodoThunk } from '../../reducers/redux_reducer';

import './App.css';

interface State {
  readonly todos: Array<Todo>;
  readonly reduxTodos: Array<Todo>;
}

interface MatchParams {
  ticketId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  readonly reduxTodoList: Array<Todo>;
  readonly todoList: Array<Todo>;
  readonly completeTodo: (id: string) => Action;
  readonly createTodo: (name: string) => Action;
  readonly completeReduxTodo: (id: string) => Action;
  readonly createReduxTodo: (name: string) => Promise<void>;
}

class TodoList extends React.Component<Props, State> {
  render() {
    const todoItems = this.props.todoList.map(
      (todoItem) => (
        <TodoBox
          item={todoItem}
          key={todoItem.id}
          onClose={this.props.completeTodo.bind(this, todoItem.id)}
        />
      )
    );
    const reduxTodoItems = this.props.reduxTodoList.map(
      (todoItem) => (
        <TodoBox
          item={todoItem}
          key={todoItem.id}
          onClose={this.props.completeReduxTodo.bind(this, todoItem.id)}
        />
      )
    );
    return (
      <div>
        <h2>REMATCH TODOS</h2>
        {todoItems}
        <NewTodoForm onCreate={this.props.createTodo} />
        <br />
        <h2>REDUX TODOS</h2>
        {reduxTodoItems}
        <NewTodoForm onCreate={this.props.createReduxTodo} />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  todoList: state.todos,
  reduxTodoList: state.reduxTodos
});

const mapDispatchToProps = (dispatch: Dispatch<Function> & MyModels ) => ({
  completeTodo: (todoId: string) => dispatch.todos.close(todoId),
  createTodo: (todoTitle: string) => dispatch.todos.asyncCreate(todoTitle),
  completeReduxTodo: (todoId: string) => dispatch(CloseTodo(todoId)),
  createReduxTodo: (todoTitle: string) => dispatch(CreateTodoThunk(todoTitle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
