import {
  AddRounded,
  DeleteOutline,
  Done,
  Edit,
  Search,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import Input from "../../atoms/input";
import { TaskCardProps } from "./types";
import styled from "@emotion/styled";
import Modal from "../../molecules/modal/modal";
import ModalHeader from "../../molecules/modal/header";
import Button from "../../atoms/button";
import { FormEvent, useRef, useState } from "react";
import { TodoEntry } from "../../../context/todo-context/types";
import { transientOptions, validateRow } from "../../../utils";
import useTodos from "../../../hooks/use-todos";

const StyledItem = styled(Box, transientOptions)<{
  $borderColor: string;
  $completed?: boolean;
  $completedColor?: string;
}>`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid ${({ $borderColor }) => $borderColor};
  background-color: ${({ $completed, $completedColor }) =>
    $completed ? $completedColor : ""};
`;

const StyledModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledCard = styled(Card)`
  border-radius: 0;
  padding: 1rem;
  height: 100dvh;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`;

const StyledListWrapper = styled.ul`
  flex: 1;
  liststyle: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
`;

const StyledTypography = styled(Typography, transientOptions)<{
  $checked?: boolean;
}>`
  max-width: 50%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-decoration: ${({ $checked }) => ($checked ? "line-through" : "")};
`;

export default function TaskCard(props: TaskCardProps) {
  const theme = useTheme();

  const [modal, setModal] = useState<{ open: boolean; editing?: TodoEntry }>({
    open: false,
  });
  const {
    handleCreateTask,
    handleUpdateTask,
    minChars,
    handleSearchChange,
    handleDeleteTask,
    handleToggleChecked,
    handleDeleteAllTasks,
    search,
  } = useTodos();

  const modalInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseModal = () => setModal({ open: false });

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if (!modalInputRef.current) return;

    const isValid = validateRow(modalInputRef.current.value, minChars);
    if (!isValid) return setErrorMessage(`Add at least ${minChars} characters`);
    if (!modal.editing) {
      handleCreateTask({ content: modalInputRef.current.value });
      handleCloseModal();
      return;
    }
    handleUpdateTask({
      ...modal.editing,
      content: modalInputRef.current.value,
    });
    handleCloseModal();
  };

  const defaultActions: TaskCardProps["actions"] = props.noDefaultActions
    ? []
    : [
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
          Icon: () => <DeleteOutline data-cy="btn-delete" color={"error"} />,
          onClick: () => handleDeleteTask(rowData.id),
        }),
      ];

  const actions = [...defaultActions, ...(props.actions || [])];
  return (
    <StyledCard>
      <CardHeader
        title={props.title}
        action={
          <>
            <IconButton
              data-cy="btn-add-task"
              onClick={() => setModal({ open: true })}
              aria-label="add-task"
            >
              <AddRounded />
            </IconButton>
            <IconButton
              data-cy="btn-delete-all"
              onClick={() => handleDeleteAllTasks()}
              aria-label="remove-all-task"
            >
              <DeleteOutline color="error" />
            </IconButton>
          </>
        }
      />

      <StyledInput
        name="search"
        onChange={(e) => {
          handleSearchChange(e.target.value);
          if (props.onFilterChange) props.onFilterChange(e.target.value);
        }}
        placeholder="Search"
        InputProps={{ startAdornment: <Search /> }}
        defaultValue={search}
      />

      <StyledListWrapper>
        {!props.data.length
          ? "No records to display"
          : props.data.map((todo, index) => (
              <StyledItem
                data-cy={`card-row-${index}`}
                $completedColor={theme.palette.common.black}
                $completed={todo.checked}
                $borderColor={theme.palette.grey["500"]}
                key={todo.id}
              >
                <StyledTypography $checked={todo.checked} variant="caption">
                  {todo.content}
                </StyledTypography>
                <div>
                  {actions.map((action, index) => {
                    const { Icon, onClick } = action(todo);
                    return (
                      <IconButton key={index} onClick={onClick}>
                        <Icon />
                      </IconButton>
                    );
                  })}
                </div>
              </StyledItem>
            ))}
      </StyledListWrapper>

      <Modal onClose={handleCloseModal} open={modal.open}>
        <div>
          <ModalHeader>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              {modal.editing ? "Update task" : "New Task"}
            </Typography>
          </ModalHeader>
          <StyledModalForm onSubmit={handleSubmitForm}>
            <Input
              autoFocus
              name="create-task"
              defaultValue={modal.editing?.content}
              errorMessage={errorMessage}
              inputRef={modalInputRef}
              onChange={() => (errorMessage ? setErrorMessage("") : "")}
            />
            <Button name="submit" type="submit">
              Add task
            </Button>
          </StyledModalForm>
        </div>
      </Modal>
    </StyledCard>
  );
}
