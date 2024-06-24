import { ReactNode, createContext, useContext, useReducer } from "react";
import todoReducer from "../../reducers/todo-reducer";
import { TodoInitialState } from "./types";

const initialState: TodoInitialState = { todos: [], dispatch: () => {} };

const TodoContext = createContext(initialState);

export function TodoContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState.todos);

  return (
    <TodoContext.Provider value={{ todos: state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => useContext(TodoContext);
