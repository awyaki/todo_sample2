/** @jsxImportSource @emotion/react */ 

/**
 * TODOアプリ
 * - ユーザーはTODOを追加できる
 * - ユーザーはTODOを削除できる 
 * - ユーザーはTODOを更新できる
 * - ユーザーはTODOの完了済の状態と未完了の状態を切り替えることができる
 */

import TodoList from './components/TodoList';
import Edit from './components/Edit';
import CreateTodo from './components/CreateTodo';
import { useTodoApp } from './hooks/todoAppState';
import { CSSObject } from '@emotion/react';
import 'destyle.css';


const container: CSSObject = {
  margin: '0 auto',
  width: '400px',
  padding: '1rem',
  backgroundColor: '#e3f2fd',
};



const App = () => {
  const [{ todoList, newBodyOfTodo, editId }, dispatch] = useTodoApp();

  if (editId) {
    const todo = todoList.find(({ id }) => id === editId);
    const body = todo ? todo.body : '';
    return (
      <div css={container}>
        <Edit 
          id={editId} 
          body={body}
          dispatch={dispatch} />
      </div>
    );
  }

  return (
    <div css={container}>
      <TodoList 
        todoList={todoList} 
        dispatch={dispatch} />
      <CreateTodo 
        dispatch={dispatch}
        value={newBodyOfTodo} />
    </div>
  );
};

export default App;
