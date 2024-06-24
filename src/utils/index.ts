import { TodoEntry } from "../context/todo-context/types";

export const validateContent = (value: string, minChars: number) => {
  return value?.trim().length >= minChars;
};

export const validateRow = (data: TodoEntry, minChars: number) => {
  const isValid = validateContent(data.content, minChars);

  if (!isValid)
    throw new Error(`Content doesn´t have more or equal ${minChars} length`);
  return isValid;
};
