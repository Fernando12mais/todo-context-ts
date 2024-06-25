import { useTheme } from "@emotion/react";

import MaterialTableComponent, {
  Icons,
  MaterialTableProps,
} from "material-table";

import { Theme } from "@mui/material";
import {
  AddRounded,
  Check,
  Clear,
  DeleteOutline,
  ChevronRight,
  Edit,
  SaveAlt,
  FilterList,
  FirstPage,
  LastPage,
  ChevronLeft,
  ArrowDownward,
  Remove,
  ViewColumn,
  Search,
} from "@mui/icons-material";
import { forwardRef } from "react";

const TableIcons: Icons = {
  Add: forwardRef((props, ref) => (
    <AddRounded data-cy="btn-add" {...props} ref={ref} />
  )),
  Check: forwardRef((props, ref) => (
    <Check data-cy="btn-check" {...props} ref={ref} />
  )),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline color="error" {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit data-cy="btn-edit" color="primary" {...props} ref={ref} />
  )),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Retry: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
};

export default function MaterialTable<T extends Object>(
  props: MaterialTableProps<T>
) {
  const theme = useTheme() as Theme;

  return (
    <MaterialTableComponent
      icons={TableIcons}
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
