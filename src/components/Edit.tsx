/** @jsxImportSource @emotion/react */
import { FC, useState, Dispatch } from 'react';
import { Action } from '../hooks/useTodoApp';
import { CSSObject } from '@emotion/react';

type Props = {
  editTodo: { id: number, body: string }
  dispatch: Dispatch<Action>; 
};

const inputStyle: CSSObject = {
  width: '270px',
  border: '1px solid black',
};

const Edit: FC<Props> = ({ editTodo, dispatch }) => {
  const [updateValue, setUpdateValue] = useState<string>(editTodo.body);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      dispatch({
        type: 'update',
        todo: { id: editTodo.id, body: updateValue }
      });
    }}>
      <input 
        css={inputStyle} 
        type="text" 
        value={updateValue}
        onChange={(e) => setUpdateValue(e.target.value)} />
      <button 
        css={{ marginLeft: '12px' }}
        >Update</button>
    </form>
  );
};

export default Edit;