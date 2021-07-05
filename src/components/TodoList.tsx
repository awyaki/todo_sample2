/** @jsxImportSource @emotion/react */
import { FC, memo, Dispatch } from 'react';
import { Action } from '../hooks/useTodoApp';

import { CSSObject } from '@emotion/react';
import Todo from './Todo';


const container: CSSObject = {
  height: '500px',
  overflowY: 'scroll',
};

type Props = {
  todoList: { id: number, body: string }[]
  dispatch: Dispatch<Action>
};

const TodoList: FC<Props> = memo(({ todoList, dispatch }) => {
  return (
    <ul css={container}>
      {todoList.map(({ id, body }) => 
        <Todo key={id} id={id} body={body} dispatch={dispatch} />
      )}
    </ul>
  );
});

export default TodoList;