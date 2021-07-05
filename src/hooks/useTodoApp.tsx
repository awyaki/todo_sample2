import { useReducer } from 'react';

type State = {
  todoList: { id: number, body: string }[];
  editTodo: {id: number, body: string } | undefined
  newBodyOfTodo: string;
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
        const newTodoList = state.todoList.concat({ id: id + 1, body: action.body });
        return { 
          todoList: newTodoList,
          newBodyOfTodo: '',
          editTodo: undefined,
        };
      case 'delete':
        {
          const index = state.todoList.findIndex(({ id }) => id === action.id);
          const newTodoList = state.todoList.slice(0, index).concat(state.todoList.slice(index+1));
          return {
            todoList: newTodoList,
            newBodyOfTodo: state.newBodyOfTodo,
            editTodo: undefined,
          } 
        }
      case 'change':
        return {
          todoList: state.todoList,
          newBodyOfTodo: action.value,
          editTodo: undefined,
        };
      case 'edit':
        return {
          todoList: state.todoList,
          newBodyOfTodo: state.newBodyOfTodo,
          editTodo: action.editTodo, 
        }; 
      case 'update':
        {
          const index = state.todoList.findIndex(({ id }) => id === action.id);
          const newTodoList = [...state.todoList];
          newTodoList[index] = { id: action.id , body: action.body };
          return {
            todoList: newTodoList,
            newBodyOfTodo: state.newBodyOfTodo,
            editTodo: undefined,
          }
        }
      default:
        return state;
    }
};

export const useTodoApp = () => {
  const [state, dispatch] = useReducer(reducer, { todoList: [], newBodyOfTodo: '', editTodo: undefined });
  return [state, dispatch] as const;
};
