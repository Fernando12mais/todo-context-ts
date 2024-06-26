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
    case "DELETE": {
      const filteredState = state.filter(
        (todo) => todo.id != action.payload.id
      );

      if (typeof localStorage !== "undefined") {
        if (filteredState.length < 1)
          localStorage.setItem("deletedAllItems", "1");
      }

      return filteredState;
    }

    case "FETCH":
      return action.payload;
    case "DELETE_ALL":
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("deletedAllItems", "1");
      }
      return [];
    case "TOGGLE-CHECKED":
      return state.map((todo) =>
        todo.id == action.payload.id
          ? { ...todo, checked: !todo.checked }
          : todo
      );
  }
}
