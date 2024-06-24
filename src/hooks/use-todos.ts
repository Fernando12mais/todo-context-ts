// import axios from "axios";

import input from "../../input.json";
import { useTodoContext } from "../context/todo-context";
import { TodoEntry } from "../context/todo-context/types";

export default function useTodos() {
  const { todos, dispatch } = useTodoContext();
  const fetchTodos = async () => {
    // try {
    //   const res = await axios.get(
    //     "https://everest-interview-public-files.s3.amazonaws.com/input.json"
    //   );

    //   console.log(res.data);
    // } catch (e) {
    //   console.log(e.message);
    // }

    const filteredTodos = input.todos.filter(
      (todo) => typeof todo.content == "string"
    ) as TodoEntry[];

    dispatch({ payload: filteredTodos, type: "FETCH" });

    return filteredTodos;
  };

  return { fetchTodos, todos, dispatch };
}
