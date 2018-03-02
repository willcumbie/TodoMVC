import { Todo } from '../../types';
import * as React from 'react';

interface Props {
  item: Todo;
  onClose: Function;
}

export const TodoBox = (props: Props) => {
  let todoClass = 'todo-box';
  if (props.item.completed) {
    todoClass += ' todo-completed';
  }

  return (
    <div className={todoClass}>
     <div>{props.item.title}</div>
     {props.item.completed ? null : <button onClick={(event) => props.onClose()}>COMPLETE</button>}
   </div>
  );
};
