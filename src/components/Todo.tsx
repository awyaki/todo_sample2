/** @jsxImportSource @emotion/react */
import { FC, useState, Dispatch, memo } from 'react';
import { CSSObject } from '@emotion/react';
import { Action } from '../hooks/useTodoApp';


const baseContainer: CSSObject = {
  display: 'flex', 
  justifyContent: 'space-between',
  padding: '.3rem',
  borderTop: '1px solid black',
  borderLeft: '1px solid black',
  borderRight: '1px solid black',
  ":nth-last-of-type(1)": {
    borderBottom: '1px solid black'
  }
};

const checkedContainer: CSSObject = {
  ...baseContainer,
  backgroundColor: '#b2ebf2',
};

const nonCheckedContainer: CSSObject = {
  ...baseContainer,
};

type Props = {
  todo: { id: number, body: string }
  dispatch: Dispatch<Action>
};

const Todo: FC<Props> = memo(({ todo, dispatch }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleCheck = () => {
    setIsChecked((isChecked) => !isChecked);
  };
  console.log(`todo ${todo.id} was rendered`);

  return (
    <li css={isChecked ? checkedContainer : nonCheckedContainer}>
      <div css={{ display: 'flex' }}>
        <button css={{width: '1.2rem'}} 
          onClick={handleCheck}
          >{isChecked ? '●' : '◯' }</button>
        <p css={{ marginLeft: '12px' }}>{todo.body}</p>
      </div>
      <div css={{ display: 'flex' }}>
        <button 
          css={{ marginRight: '5px'}}
          onClick={() => dispatch({
            type: 'edit',
            editTodo: todo,
          })}
          >Edit</button>
        <button onClick={() => dispatch({
          type: 'delete',
          id: todo.id, 
        })}>X</button>
      </div>
    </li>
  );
});

export default Todo;