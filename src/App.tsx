import "./App.css";

import { Card, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";

import { Suspense, useEffect } from "react";

import useTodos from "./hooks/use-todos";

import { lazy } from "react";
import styled from "@emotion/styled";
import Loading from "./components/ui/loading";

const TodoTable = lazy(() => import("./components/ui/todo-table"));
const TodoCard = lazy(() => import("./components/ui/todo-card"));

const StyledCard = styled(Card)`
  border-radius: 0;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
function App() {
  const { fetchTodos } = useTodos();

  const theme = createTheme({ palette: { mode: "dark" } });

  useEffect(() => {
    fetchTodos();
  }, []);

  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <ThemeProvider theme={theme}>
      <StyledCard>
        <Suspense
          fallback={
            <LoadingWrapper>
              <Loading />
            </LoadingWrapper>
          }
        >
          {!isMobile ? <TodoTable /> : <TodoCard />}
        </Suspense>
      </StyledCard>
    </ThemeProvider>
  );
}

export default App;
