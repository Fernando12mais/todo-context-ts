import { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "../../molecules/modal/modal";
import ModalHeader from "../../molecules/modal/header";
import { Typography } from "@mui/material";

import Button from "../../atoms/button";
import useTodos from "../../../hooks/use-todos";
import { DeleteTodoModalRef } from "./types";
import styled from "@emotion/styled";

const StyledModalFooter = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;
export default forwardRef<DeleteTodoModalRef>(function DeleteTodoModal(_, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => setIsOpen(false);
  const handleOpenModal = () => setIsOpen(true);

  const { handleDeleteAllTasks } = useTodos();

  const handleConfirm = () => {
    handleDeleteAllTasks();
    setIsOpen(false);
  };

  useImperativeHandle(ref, () => ({ open: handleOpenModal }));

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <div>
        <ModalHeader>
          <Typography variant="h5" component="h3" align="center">
            Are you sure you want to delete all tasks?
          </Typography>

          <Typography
            marginTop={"1rem"}
            variant="caption"
            component="p"
            color="red"
            align="center"
          >
            You're about to delete all your tasks. Proceed with caution.
          </Typography>
        </ModalHeader>

        <StyledModalFooter>
          <Button
            name="confirm-delete-all"
            color="error"
            variant="outlined"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
          <Button onClick={handleCloseModal} variant="contained">
            Cancel
          </Button>
        </StyledModalFooter>
      </div>
    </Modal>
  );
});
