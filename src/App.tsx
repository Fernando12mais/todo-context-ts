import "./App.css";

import {
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";

import Button from "./components/atoms/button";
import styled from "@emotion/styled";

import {
  FormEvent,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AddRounded,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Done,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@mui/icons-material";

import MaterialTable from "./components/organisms/material-table";
import useTodos from "./hooks/use-todos";
import Input from "./components/atoms/input";
import { TodoEntry } from "./context/todo-context/types";
import { Icons } from "material-table";
import TaskCard from "./components/organisms/task-card";
import Modal from "./components/molecules/modal/modal";
import ModalHeader from "./components/molecules/modal/header";
import { validateContent, validateRow } from "./utils";

const minChars = 3;

const TableIcons: Icons = {
  Add: forwardRef((props, ref) => (
    <AddRounded data-cy="btn-add" {...props} ref={ref} />
  )),
  Check: forwardRef((props, ref) => (
    <Check data-cy="btn-check" {...props} ref={ref} />
  )),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline data-cy="btn-delete" color="error" {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit data-cy="btn-edit" color="primary" {...props} ref={ref} />
  )),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Retry: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
};

const StyledModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function App() {
  const { fetchTodos, dispatch, todos } = useTodos();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<{ open: boolean; editing?: TodoEntry }>({
    open: false,
  });

  const handleCloseModal = () => setModal({ open: false });
  const theme = createTheme({ palette: { mode: "dark" } });
  const modalInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmitForm = (e: FormEvent) => {
    if (!modalInputRef.current) return;
    e.preventDefault();
    const isValid = validateContent(modalInputRef.current.value, minChars);
    if (!isValid) return setErrorMessage(`Add at least ${minChars} characters`);
    if (!modal.editing) {
      handleAddTask(modalInputRef.current.value);
      handleCloseModal();
      return;
    }
    handleUpdateTask({
      ...modal.editing,
      content: modalInputRef.current.value,
    });
    handleCloseModal();
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDeleteTask = (id: number) =>
    dispatch({ type: "DELETE", payload: { id } });
  const handleToggleChecked = (id: number) =>
    dispatch({ type: "TOGGLE-CHECKED", payload: { id } });

  const handleUpdateTask = (payload: TodoEntry) =>
    dispatch({ type: "UPDATE", payload });
  const handleAddTask = (value: string) =>
    dispatch({ payload: { content: value }, type: "CREATE" });

  const sortedTodos = useMemo(
    () => todos.sort((a, b) => Number(a.checked) - Number(b.checked)),
    [todos]
  );

  const filteredTodos = useMemo(
    () =>
      sortedTodos.filter((todo) =>
        todo.content.toLowerCase().startsWith(search.toLowerCase())
      ),
    [sortedTodos, search]
  );

  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <ThemeProvider theme={theme}>
      {!isMobile ? (
        <MaterialTable
          icons={TableIcons}
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

              customFilterAndSearch: (filter, rowData) =>
                rowData.content.toLowerCase().startsWith(filter.toLowerCase()),
              validate: (rowData) => validateContent(rowData.content, minChars),
            },
          ]}
          data={sortedTodos}
          components={{
            EditField: (props) => (
              <Input
                name={"create-task"}
                autoFocus
                onChange={(e) => props.onChange(e.target.value)}
                value={props.value || ""}
                errorMessage={
                  props.error ? `Add at least ${minChars} characters` : ""
                }
              />
            ),
          }}
          editable={{
            onRowDelete: async (oldData) => handleDeleteTask(oldData.id),
            onRowUpdate: async (newData) => {
              validateRow(newData, minChars);
              handleUpdateTask(newData);
            },

            onRowAdd: async (rowData) => {
              validateRow(rowData, minChars);
              handleAddTask(rowData.content);
            },
          }}
          actions={[
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
          ]}
        />
      ) : (
        <TaskCard
          title="Todo list"
          onAddItem={() => setModal({ open: true })}
          data={filteredTodos}
          onFilterChange={setSearch}
          actions={[
            (rowData) => ({
              Icon: () => (
                <Done
                  data-cy="btn-done"
                  color={rowData.checked ? "success" : "action"}
                />
              ),
              onClick: () => handleToggleChecked(rowData.id),
            }),
            (rowData) => ({
              Icon: () => <Edit data-cy="btn-edit" color={"primary"} />,
              onClick: () => setModal({ open: true, editing: rowData }),
            }),
            (rowData) => ({
              Icon: () => (
                <DeleteOutline data-cy="btn-delete" color={"error"} />
              ),
              onClick: () => handleDeleteTask(rowData.id),
            }),
          ]}
        />
      )}

      <Modal onClose={handleCloseModal} open={modal.open}>
        <div>
          <ModalHeader>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              New Task
            </Typography>
          </ModalHeader>
          <StyledModalForm onSubmit={handleSubmitForm}>
            <Input
              name="create-task"
              defaultValue={modal.editing?.content}
              errorMessage={errorMessage}
              inputRef={modalInputRef}
              onChange={() => {
                if (errorMessage) setErrorMessage("");
              }}
            />
            <Button name="submit" type="submit">
              Add task
            </Button>
          </StyledModalForm>
        </div>
      </Modal>
    </ThemeProvider>
  );
}

export default App;
