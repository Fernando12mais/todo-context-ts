import { TodoEntry, TodoAction } from "../context/todo-context/types";

export default function todoReducer(state: TodoEntry[], action: TodoAction) {
  switch (action.type) {
    case "CREATE":
      return [
        {
          content: action.payload.content,
          checked: false,
          id: Math.random() * 9999,
        },
        ...state,
      ];

    case "UPDATE":
      return state.map((todo) =>
        todo.id == action.payload.id ? { ...action.payload } : todo
      );
    case "DELETE":
      return state.filter((todo) => todo.id != action.payload.id);
    case "FETCH":
      return action.payload;
    case "TOGGLE-CHECKED":
      return state.map((todo) =>
        todo.id == action.payload.id
          ? { ...todo, checked: !todo.checked }
          : todo
      );
  }
}
