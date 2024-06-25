import { AddRounded, Search } from "@mui/icons-material";
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

const StyledItem = styled(Box)<{
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

export default function TaskCard(props: TaskCardProps) {
  const theme = useTheme();
  return (
    <Card
      style={{
        borderRadius: 0,
        padding: "1rem",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader
        title={props.title}
        action={
          <IconButton
            data-cy="btn-add-task"
            onClick={props.onAddItem}
            aria-label="add-task"
          >
            <AddRounded />
          </IconButton>
        }
      />

      <Input
        name="search"
        onChange={(e) => props.onFilterChange(e.target.value)}
        placeholder="Search"
        InputProps={{ startAdornment: <Search /> }}
        style={{ marginBottom: "1rem" }}
      />

      <ul
        style={{
          flex: 1,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          overflow: "auto",
        }}
      >
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
                <Typography
                  style={{
                    maxWidth: "50%",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textDecoration: todo.checked ? "line-through" : "",
                  }}
                  variant="caption"
                >
                  {todo.content}
                </Typography>
                <div>
                  {props.actions.map((action, index) => {
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
      </ul>
    </Card>
  );
}
