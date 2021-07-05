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
import { useTodoApp } from './hooks/useTodoApp';
import { CSSObject } from '@emotion/react';
import 'destyle.css';


const container: CSSObject = {
  margin: '0 auto',
  width: '400px',
  padding: '1rem',
  backgroundColor: '#e3f2fd',
};



const App = () => {
  const [{ todoList, inputVal, editTodo }, dispatch] = useTodoApp();

  // editTodoがnumberのときTODO編集用の画面となる。
  if (editTodo) {
    return (
      <div css={container}>
        <Edit 
          editTodo={editTodo}
          dispatch={dispatch} />
      </div>
    );
  }

  // メイン（TodoList）のUI
  return (
    <div css={container}>
      <TodoList 
        todoList={todoList} 
        dispatch={dispatch} />
      <CreateTodo 
        dispatch={dispatch}
        value={inputVal} />
    </div>
  );
};

export default App;
