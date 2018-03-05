import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Todo } from '../../types';
import { TodoBox } from './TodoBox';
import { NewTodoForm } from './NewTodoForm';
import { Action } from '@rematch/core';
import { MyModels } from '../../reducers';

import './App.css';

interface State {
  readonly todos: Array<Todo>;
}

interface MatchParams {
  ticketId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  readonly todoList: Array<Todo>;
  readonly completeTodo: (id: string) => Action;
  readonly createTodo: (name: string) => Action;
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
    return (
      <div>
        {todoItems}
        <NewTodoForm onCreate={this.props.createTodo} />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  todoList: state.todos
});

const mapDispatchToProps = (dispatch: Dispatch<Function> & MyModels ) => ({
  completeTodo: (todoId: string) => dispatch.todos.close(todoId),
  createTodo: (todoTitle: string) => dispatch.todos.asyncCreate(todoTitle)
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
