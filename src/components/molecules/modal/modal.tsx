import {
  ModalProps,
  Modal as ModalComponent,
  Box,
  styled,
} from "@mui/material";

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  box-shadow: 24px;
  background-color: black;
  padding: 1rem;
  border-radius: 0.3rem;
`;

export default function Modal(props: ModalProps) {
  return (
    <ModalComponent {...props}>
      <StyledBox>{props.children} </StyledBox>
    </ModalComponent>
  );
}
