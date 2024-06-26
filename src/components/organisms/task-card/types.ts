import { ReactNode } from "react";
import { TodoEntry } from "../../../context/todo-context/types";

export type TaskCardProps = {
  title: string;
  onFilterChange?: (value: string) => void;
  actions?: ((data: TodoEntry) => {
    onClick: () => void;
    Icon: () => ReactNode;
    name: string;
  })[];
  data: TodoEntry[];
  noDefaultActions?: boolean;
};
