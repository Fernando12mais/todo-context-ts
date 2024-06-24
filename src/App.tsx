import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material";

import { useEffect, useMemo } from "react";

import { Done } from "@mui/icons-material";

import MaterialTable from "./components/organisms/material-table";
import useTodos from "./hooks/use-todos";
import Input from "./components/atoms/input";
import { TodoEntry } from "./context/todo-context/types";

const minChars = 5;

const validateContent = (value: string) => {
  return value?.trim().length >= minChars;
};

const validateRow = (data: TodoEntry) => {
  const isValid = validateContent(data.content);

  if (!isValid || data.content.length <= 0) throw new Error("has error");
  return isValid;
};

function App() {
  const { fetchTodos, dispatch, todos } = useTodos();
  const theme = createTheme({ palette: { mode: "dark" } });
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDeleteTask = (id: number) =>
    dispatch({ type: "DELETE", payload: { id } });
  const handleToggleChecked = (id: number) =>
    dispatch({ type: "TOGGLE-CHECKED", payload: { id } });

  const handleUpdateTask = (payload: TodoEntry) =>
    dispatch({ type: "UPDATE", payload });

  const sortedTodos = useMemo(
    () => todos.sort((a, b) => Number(a.checked) - Number(b.checked)),
    [todos]
  );

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        style={{ width: "100%", minHeight: "100dvh", borderRadius: 0 }}
        title="My todo list"
        columns={[
          {
            title: "Content",
            field: "content",
            cellStyle: (data, rowData) => ({
              textDecoration: rowData?.checked ? "line-through" : "",
              fontWeight: rowData?.checked ? 700 : 400,
            }),
            validate: (rowData) => validateContent(rowData.content),
          },
        ]}
        data={sortedTodos}
        components={{
          EditField: (props) => (
            <Input
              autoFocus
              onChange={(e) => props.onChange(e.target.value)}
              value={props.value || ""}
              errorMessage={props.error ? "Add at least 5 characters" : ""}
            />
          ),
        }}
        editable={{
          onRowDelete: async (oldData) => handleDeleteTask(oldData.id),
          onRowUpdate: async (newData) => {
            validateRow(newData);
            handleUpdateTask(newData);
          },

          onRowAdd: async (rowData) => {
            validateRow(rowData);
            dispatch({ type: "CREATE", payload: { content: rowData.content } });
          },
        }}
        actions={[
          (rowData) => ({
            tooltip: "Mark as done",
            icon: () => <Done color={rowData.checked ? "success" : "action"} />,
            onClick: () => handleToggleChecked(rowData.id),
          }),
        ]}
      />
    </ThemeProvider>
  );
}

export default App;
