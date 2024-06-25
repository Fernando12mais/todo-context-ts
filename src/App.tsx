import "./App.css";

import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";

import { useEffect } from "react";

import useTodos from "./hooks/use-todos";

import TodoTable from "./components/ui/todo-table";
import TodoCard from "./components/ui/todo-card";

function App() {
  const { fetchTodos } = useTodos();

  const theme = createTheme({ palette: { mode: "dark" } });

  useEffect(() => {
    fetchTodos();
  }, []);

  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <ThemeProvider theme={theme}>
      {!isMobile ? <TodoTable /> : <TodoCard />}
    </ThemeProvider>
  );
}

export default App;
