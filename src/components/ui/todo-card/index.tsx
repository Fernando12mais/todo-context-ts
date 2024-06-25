import useTodos from "../../../hooks/use-todos";
import TaskCard from "../../organisms/task-card";

export default function TodoCard() {
  const { filterTodosBySearch } = useTodos();
  const filteredTodos = filterTodosBySearch();
  return <TaskCard title="Todo list" data={filteredTodos} />;
}
