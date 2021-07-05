/** @jsxImportSource @emotion/react */
import { FC, useState, Dispatch, ChangeEvent } from 'react';
import { Action } from '../hooks/todoAppState';
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
  const handleUpdateValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateValue(e.target.value);
  }; 
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      dispatch({
        type: 'update',
        id: editTodo.id,
        body: updateValue,
      });
    }}>
      <input 
        css={inputStyle} 
        type="text" 
        value={updateValue}
        onChange={handleUpdateValueChange} />
      <button 
        css={{ marginLeft: '12px' }}
        >Update</button>
    </form>
  );
};

export default Edit;