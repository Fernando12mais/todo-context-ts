import useTodos from "../../../hooks/use-todos";
import TaskCard from "../../organisms/task-card";

export default function TodoCard() {
  const { filteredTodosBySearch } = useTodos();

  return <TaskCard title="Todo list" data={filteredTodosBySearch} />;
}
