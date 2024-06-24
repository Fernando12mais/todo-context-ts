import { ReactNode } from "react";
import { TodoEntry } from "../../../context/todo-context/types";

export type TaskCardProps = {
  title: string;
  onFilterChange: (value: string) => void;
  onAddItem: () => void;
  actions: ((data: TodoEntry) => {
    onClick: () => void;
    Icon: () => ReactNode;
  })[];
  data: TodoEntry[];
};
