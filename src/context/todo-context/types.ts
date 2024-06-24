import { Dispatch } from "react";

export type TodoInitialState = {
  todos: TodoEntry[];
  dispatch: Dispatch<TodoAction>;
};
export type TodoEntry = { id: number; content: string; checked: boolean };

export type TodoAction =
  | { type: "CREATE"; payload: Pick<TodoEntry, "content"> }
  | { type: "UPDATE"; payload: TodoEntry }
  | { type: "DELETE"; payload: Pick<TodoEntry, "id"> }
  | { type: "FETCH"; payload: TodoEntry[] }
  | { type: "TOGGLE-CHECKED"; payload: Pick<TodoEntry, "id"> };

export type TodoPayloads = {
  create: Pick<TodoEntry, "content">;
  update: TodoEntry;
  delete: void;
};
