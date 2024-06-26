import axios from "axios";

import { useMemo } from "react";
import input from "../../input.json";
import { useTodoContext } from "../context/todo-context";
import {
  TodoActionCreateOrUpdate,
  TodoActionCreatePayload,
  TodoActionUpdatePayload,
  TodoEntry,
} from "../context/todo-context/types";
import { searchRule, validateRow } from "../utils";
import { useSearchParams } from "react-router-dom";

export default function useTodos(options?: { minChars: number }) {
  const minChars = options?.minChars ?? 3;
  const { todos, dispatch } = useTodoContext();

  const [params, setParams] = useSearchParams({ q: "" });

  const search = useMemo(() => params.get("q") ?? "", [params]);

  const sortedTodos = useMemo(
    () => todos.sort((a, b) => Number(a.checked) - Number(b.checked)),
    [todos]
  );

  const handleSearchChange = (value: string) => setParams({ q: value });

  const filteredTodosBySearch = useMemo(() => {
    return sortedTodos.filter((todo) => searchRule(todo.content, search));
  }, [search, sortedTodos]);

  const getCachedTodos = () => {
    const cachedTodos = localStorage.getItem("todos");
    if (cachedTodos) {
      try {
        const parsedTodos = JSON.parse(cachedTodos) as TodoEntry[];

        return parsedTodos;
      } catch (err) {
        console.error("invalid todos value");
        return [];
      }
    }
    return [];
  };

  const filterInitialTodos = (data: TodoEntry[]) =>
    data.filter((todo) => typeof todo.content == "string" && todo.id);

  const fetchTodos = async () => {
    const cachedTodos = getCachedTodos();
    const alreadyVisited = localStorage.getItem("alreadyVisited");

    if (alreadyVisited == "1") {
      dispatch({ payload: cachedTodos, type: "FETCH" });

      return cachedTodos;
    }
    localStorage.setItem("alreadyVisited", "1");
    try {
      const res = await axios.get(
        "https://everest-interview-public-files.s3.amazonaws.com/input.json"
      );

      const filteredTodos = filterInitialTodos(res.data.todos);
      dispatch({ payload: filteredTodos, type: "FETCH" });
      localStorage.setItem("todos", JSON.stringify(filteredTodos));
      return filteredTodos;
    } catch (e) {
      const filteredTodos = filterInitialTodos(input.todos as TodoEntry[]);
      dispatch({ payload: filteredTodos, type: "FETCH" });
      localStorage.setItem("todos", JSON.stringify(filteredTodos));

      return filteredTodos;
    }
  };

  const handleCreateOrUpdateTask = (
    action: TodoActionCreateOrUpdate,
    throwError?: boolean
  ) => {
    const isValid = validateRow(action.payload.content, minChars, throwError);
    if (!isValid) return false;
    switch (action.type) {
      case "CREATE":
        dispatch(action);
        break;
      case "UPDATE":
        dispatch(action);
        break;
    }
    return true;
  };

  const handleCreateTask = (
    payload: TodoActionCreatePayload,
    throwError?: boolean
  ) => handleCreateOrUpdateTask({ type: "CREATE", payload }, throwError);

  const handleUpdateTask = (
    payload: TodoActionUpdatePayload,
    throwError?: boolean
  ) => handleCreateOrUpdateTask({ type: "UPDATE", payload }, throwError);

  const handleToggleChecked = (id: number) =>
    dispatch({ type: "TOGGLE-CHECKED", payload: { id } });

  const handleDeleteTask = (id: number) =>
    dispatch({ type: "DELETE", payload: { id } });

  const handleDeleteAllTasks = () => dispatch({ type: "DELETE_ALL" });

  return {
    fetchTodos,
    todos,
    dispatch,
    handleCreateTask,
    handleUpdateTask,
    handleToggleChecked,
    handleDeleteTask,
    handleSearchChange,
    filteredTodosBySearch,
    handleDeleteAllTasks,
    search,
    minChars,
  };
}
