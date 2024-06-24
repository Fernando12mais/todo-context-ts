import { test, describe, expect } from "vitest";
import todoReducer from "../../reducers/todo-reducer";
import { TodoEntry } from "../../context/todo-context/types";

const initialState: TodoEntry[] = [
  { checked: false, content: "test", id: 1 },
  { checked: false, content: "test", id: 2 },
  { checked: false, content: "test", id: 3 },
];
describe("Should test all cases for todoReducer function", () => {
  test("Should create a new task", () => {
    const content = "newItem";
    const newState = todoReducer(initialState, {
      type: "CREATE",
      payload: { content },
    });
    expect(newState.length).toEqual(4);
    const newItem = newState.find((item) => item.content == content);
    expect(newItem?.content).to.eq(content);
  });
  test("Should update a task", () => {
    const taskToUpdate = { ...initialState[0], content: "updatedItem" };
    const newState = todoReducer(initialState, {
      type: "UPDATE",
      payload: taskToUpdate,
    });
    const updatedState = newState.find(
      (todo) => todo.content == taskToUpdate.content
    );
    expect(updatedState?.content).toEqual(taskToUpdate.content);
  });
  test("Should remove a task by id", () => {
    const taskToDelete = { id: initialState[0].id };
    const newState = todoReducer(initialState, {
      type: "DELETE",
      payload: taskToDelete,
    });
    expect(newState.find((task) => task.id == taskToDelete.id)).toBeFalsy();
  });

  test("Should replace the initialState with the new fetched one", () => {
    const fetchedState: TodoEntry[] = [
      { id: 5, checked: true, content: "test" },
      { id: 10, checked: true, content: "test" },
      { id: 15, checked: true, content: "test" },
    ];
    const newState = todoReducer(initialState, {
      type: "FETCH",
      payload: fetchedState,
    });
    const initialStateIds = initialState.map((item) => item.id);

    expect(newState.some((item) => initialStateIds.includes(item.id))).toBe(
      false
    );
    const fetchedStateIds = fetchedState.map((item) => item.id);
    expect(newState.every((task) => fetchedStateIds.includes(task.id))).toBe(
      true
    );
  });

  test("Should toggle the checked value for the specific item by id", () => {
    const itemToToggle = initialState[0];

    const newState = todoReducer(initialState, {
      type: "TOGGLE-CHECKED",
      payload: itemToToggle,
    });

    const itemToggled = newState.find((item) => item.id == itemToToggle.id);
    expect(itemToggled?.checked).toBe(!itemToToggle.checked);
  });
});
