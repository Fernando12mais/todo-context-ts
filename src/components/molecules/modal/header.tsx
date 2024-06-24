import { Box, BoxProps, styled } from "@mui/material";
import { forwardRef } from "react";

const StyledBox = styled(Box)`
  margin-bottom: 2rem;
`;

export default forwardRef(function ModalHeader(props: BoxProps, ref) {
  return (
    <StyledBox {...props} ref={ref}>
      {props.children}
    </StyledBox>
  );
});
