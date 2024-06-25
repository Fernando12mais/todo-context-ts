import { TodoEntry } from "../context/todo-context/types";
import { CreateStyled } from "@emotion/styled";

const validateContent = (value: string, minChars: number) => {
  return value?.trim().length >= minChars;
};

export const validateRow = (
  content: TodoEntry["content"],
  minChars: number,
  throwError?: boolean
) => {
  const isValid = validateContent(content, minChars);

  if (!isValid && throwError)
    throw new Error(`Content doesn´t have more or equal ${minChars} length`);
  return isValid;
};

export const transientOptions: Parameters<CreateStyled>[1] = {
  shouldForwardProp: (propName: string) => !propName.startsWith("$"),
};

export const searchRule = (value: string, startsWith: string) =>
  value.toLowerCase().startsWith(startsWith.toLowerCase());
