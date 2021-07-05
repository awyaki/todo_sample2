/** @jsxImportSource @emotion/react */
import { FC, useState, Dispatch } from 'react';
import { CSSObject } from '@emotion/react';
import { Action } from '../hooks/useTodoApp';


const baseContainer: CSSObject = {
  display: 'flex', 
  justifyContent: 'space-between',
  padding: '.3rem',
  borderTop: '1px solid black',
  borderLeft: '1px solid black',
  borderRight: '1px solid black',
  ":nth-last-child(1)": {
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
  id: number;
  body: string;
  dispatch: Dispatch<Action>
};

const Todo: FC<Props> = ({ id, body, dispatch }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleCheck = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  return (
    <li css={isChecked ? checkedContainer : nonCheckedContainer}>
      <div css={{ display: 'flex' }}>
        <button css={{width: '1.2rem'}} 
          onClick={handleCheck}
          >{isChecked ? '●' : '◯' }</button>
        <p css={{ marginLeft: '12px' }}>{body}</p>
      </div>
      <div css={{ display: 'flex' }}>
        <button 
          css={{ marginRight: '5px'}}
          onClick={() => dispatch({
            type: 'edit',
            editTodo: { id: id, body: body },
          })}
          >Edit</button>
        <button onClick={() => dispatch({
          type: 'delete',
          id: id, 
        })}>X</button>
      </div>
    </li>
  );
};

export default Todo;