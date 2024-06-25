import { Done } from "@mui/icons-material";
import useTodos from "../../../hooks/use-todos";

import MaterialTable from "../../organisms/material-table";

import type { MaterialTableProps } from "material-table";
import type { TodoEntry } from "../../../context/todo-context/types";
import { searchRule, validateRow } from "../../../utils";
import Input from "../../atoms/input";

type Props = MaterialTableProps<TodoEntry>;

export default function TodoTable() {
  const {
    sortedTodos,
    handleUpdateTask,
    handleCreateTask,
    handleDeleteTask,
    handleToggleChecked,
    minChars,
    search,
    handleSearchChange,
  } = useTodos();

  const actions: Props["actions"] = [
    (rowData) => ({
      tooltip: "Mark as done",
      icon: () => (
        <Done
          data-cy="btn-done"
          color={rowData.checked ? "success" : "action"}
        />
      ),
      onClick: () => handleToggleChecked(rowData.id),
    }),
  ];

  const columns: Props["columns"] = [
    {
      title: "Content",
      field: "content",
      cellStyle: (data, rowData) => ({
        textDecoration: rowData?.checked ? "line-through" : "",
        fontWeight: rowData?.checked ? 700 : 400,
      }),
      customFilterAndSearch: (filter, rowData) =>
        searchRule(rowData.content, search),
      validate: (rowData) => validateRow(rowData.content, minChars),
    },
  ];

  const editable: Props["editable"] = {
    onRowDelete: async (oldData) => handleDeleteTask(oldData.id),
    onRowUpdate: async (newData) => handleUpdateTask(newData, true),

    onRowAdd: async (rowData) => handleCreateTask(rowData, true),
  };
  const components: Props["components"] = {
    EditField: (props) => (
      <Input
        name={"create-task"}
        autoFocus
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value || ""}
        errorMessage={props.error ? `Add at least ${minChars} characters` : ""}
      />
    ),
  };

  return (
    <MaterialTable
      style={{ width: "100%", minHeight: "100dvh", borderRadius: 0 }}
      title="My todo list"
      onSearchChange={handleSearchChange}
      columns={columns}
      data={sortedTodos}
      editable={editable}
      actions={actions}
      components={components}
    />
  );
}
