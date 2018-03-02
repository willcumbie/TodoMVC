import * as React from 'react';

interface Props {
  onCreate: (text: string) => void;
}

export const NewTodoForm = (props: Props) => {
  let textInput: HTMLInputElement | null;

  return (
    <div className="todo-form">
      New Todo. Text:
      <input type="text" ref={(input) => { textInput = input; }} />
      <button onClick={(event) => props.onCreate((textInput as HTMLInputElement).value)}>Create</button>
    </div>
  );
};
