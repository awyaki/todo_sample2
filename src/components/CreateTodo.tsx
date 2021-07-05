/**
 *　新規にTodoを作る機能を持つコンポーネント 
 */
/** @jsxImportSource @emotion/react */
import { Dispatch, FC } from 'react';
import { Action } from '../hooks/todoAppState';
import { CSSObject } from '@emotion/react';

const container: CSSObject = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#90caf9',
  padding: '.3rem'
};

const inputStyle: CSSObject = {
  width: '270px',
  border: '1px solid black',
};

type Props = {
  dispatch: Dispatch<Action>;
  value: string;
};

const CreateTodo: FC<Props> = ({ dispatch, value }) => {
  return (
    <form css={container} onSubmit={(e) => {
      e.preventDefault();
      dispatch({ 
        type: 'add',
        body: value,
      })}}>
      <input 
        css={inputStyle} 
        type="text" 
        onChange={(e) => dispatch({
          type: 'change',
          value: e.target.value,
        })}
        value={value} />
      <button>Add</button>
    </form>
  );
};

export default CreateTodo;