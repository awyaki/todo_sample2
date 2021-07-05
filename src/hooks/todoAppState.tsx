import { useReducer } from 'react';

type State = {
  todoList: { id: number, body: string }[];
  isEdit: number | undefined;
  newBodyOfTodo: string;
};

export type Action = {
  type: 'edit';
  id: number;
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
          isEdit: undefined,
        };
      case 'delete':
        {
          const index = state.todoList.findIndex(({ id }) => id === action.id);
          const newTodoList = state.todoList.slice(0, index).concat(state.todoList.slice(index+1));
          return {
            todoList: newTodoList,
            newBodyOfTodo: state.newBodyOfTodo,
            isEdit: undefined,
          } 
        }
      case 'change':
        return {
          todoList: state.todoList,
          newBodyOfTodo: action.value,
          isEdit: undefined,
        };
      case 'edit':
        return {
          todoList: state.todoList,
          newBodyOfTodo: state.newBodyOfTodo,
          isEdit: action.id, 
        }; 
      case 'update':
        {
          const index = state.todoList.findIndex(({ id }) => id === action.id);
          const newTodoList = [...state.todoList];
          newTodoList[index] = { id: action.id , body: action.body };
          return {
            todoList: newTodoList,
            newBodyOfTodo: state.newBodyOfTodo,
            isEdit: undefined,
          }
        }
      default:
        return state;
    }
};

export const useTodoApp = () => {
  const [state, dispatch] = useReducer(reducer, { todoList: [], newBodyOfTodo: '', isEdit: undefined });
  return [state, dispatch] as const;
};
