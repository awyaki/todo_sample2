import { useReducer } from 'react';

type State = {
  todoList: { id: number, body: string }[];
  editTodo: {id: number, body: string } | undefined
  inputVal: string;
};

export type Action = {
  type: 'edit';
  editTodo: { id: number, body: string };
}
| {
  type: 'update';
  id: number;
  body: string;
}
| {
  type: 'add';
  body: string;
}
| {
  type: 'delete';
  id: number;
}
| {
  type: 'change';
  value: string;
};


const reducer = (
  state: State,
  action: Action
  ): State => {
    switch (action.type) {
      case 'add':
        const id = state.todoList.length === 0 ? 1 : Math.max(...state.todoList.map(({ id }) => id)) + 1;
        const newTodoList = state.todoList.concat({ id: id, body: action.body });
        return { 
          todoList: newTodoList,
          inputVal: '',
          editTodo: undefined,
        };
      case 'delete':
        {
          const index = state.todoList.findIndex(({ id }) => id === action.id);
          const newTodoList = state.todoList.slice(0, index).concat(state.todoList.slice(index+1));
          return {
            todoList: newTodoList,
            inputVal: state.inputVal,
            editTodo: undefined,
          } 
        }
      case 'change':
        return {
          todoList: state.todoList,
          inputVal: action.value,
          editTodo: undefined,
        };
      case 'edit':
        return {
          todoList: state.todoList,
          inputVal: state.inputVal,
          editTodo: action.editTodo, 
        }; 
      case 'update':
        {
          const index = state.todoList.findIndex(({ id }) => id === action.id);
          const newTodoList = [...state.todoList];
          newTodoList[index] = { id: action.id , body: action.body };
          return {
            todoList: newTodoList,
            inputVal: state.inputVal,
            editTodo: undefined,
          }
        }
      default:
        return state;
    }
};

export const useTodoApp = () => {
  const [state, dispatch] = useReducer(reducer, { todoList: [], inputVal: '', editTodo: undefined });
  return [state, dispatch] as const;
};
