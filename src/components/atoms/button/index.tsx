import { Button as ButtonComponent, type ButtonProps } from "@mui/material";

export default function Button(props: ButtonProps) {
  return (
    <ButtonComponent {...props} data-cy={`btn-${props.name}`}></ButtonComponent>
  );
}
