import { Dispatch } from "react";

export type TodoInitialState = {
  todos: TodoEntry[];
  dispatch: Dispatch<TodoAction>;
};
export type TodoEntry = { id: number; content: string; checked: boolean };

export type TodoAction =
  | TodoActionCreateOrUpdate
  | { type: "DELETE_ALL" }
  | { type: "DELETE"; payload: Pick<TodoEntry, "id"> }
  | { type: "FETCH"; payload: TodoEntry[] }
  | { type: "TOGGLE-CHECKED"; payload: Pick<TodoEntry, "id"> };

export type TodoActionCreateOrUpdate =
  | { type: "CREATE"; payload: TodoActionCreatePayload }
  | { type: "UPDATE"; payload: TodoActionUpdatePayload };

export type TodoActionCreatePayload = Pick<TodoEntry, "content">;
export type TodoActionUpdatePayload = TodoEntry;

export type TodoPayloads = {
  create: Pick<TodoEntry, "content">;
  update: TodoEntry;
  delete: void;
};
