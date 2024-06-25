import { TextField, TextFieldProps, Typography } from "@mui/material";
import { forwardRef } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
`;

const ErrorMessage = styled(Typography)`
  position: absolute;
  bottom: 0;
  translate: 0 100%;
`;
export default forwardRef<
  HTMLInputElement,
  TextFieldProps & { errorMessage?: string }
>(function Input({ errorMessage, ...props }, ref) {
  return (
    <Container>
      <TextField
        data-cy={`input-${props.name}`}
        error={!!errorMessage}
        {...props}
        ref={ref}
      />
      {errorMessage && (
        <ErrorMessage
          data-cy={`error-${props.name}`}
          variant="caption"
          color="red"
        >
          {errorMessage}
        </ErrorMessage>
      )}
    </Container>
  );
});
