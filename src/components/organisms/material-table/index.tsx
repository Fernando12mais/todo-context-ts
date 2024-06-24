import { useTheme } from "@emotion/react";

import MaterialTableComponent, { MaterialTableProps } from "material-table";

import { Theme } from "@mui/material";

export default function MaterialTable<T extends Object>(
  props: MaterialTableProps<T>
) {
  const theme = useTheme() as Theme;

  return (
    <MaterialTableComponent
      icons={props.icons}
      options={{
        sorting: false,
        pageSizeOptions: [5, 10],
        pageSize: 10,
        rowStyle: (data) => ({
          background: data.checked ? theme.palette.common.black : "",
        }),
      }}
      {...props}
    />
  );
}
