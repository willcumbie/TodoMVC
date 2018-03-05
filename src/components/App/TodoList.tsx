import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Todo } from '../../types';
import { TodoBox } from './TodoBox';
import { NewTodoForm } from './NewTodoForm';
import { CloseTodo, CreateTodoThunk, TodoAction } from '../../reducers';

import './App.css';

interface State {
  readonly todos: Array<Todo>;
}

interface MatchParams {
  ticketId: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  readonly todoList: Array<Todo>;
  readonly completeTodo: () => TodoAction;
  readonly createTodo: () => Promise<void>;
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

const mapDispatchToProps = (dispatch: Dispatch<Function>) => ({
  completeTodo: (todoId: string) => dispatch(CloseTodo(todoId)),
  createTodo: (todoTitle: string) => dispatch(CreateTodoThunk(todoTitle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
