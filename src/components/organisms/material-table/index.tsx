import { useTheme } from "@emotion/react";
import { Theme } from "@mui/system/createTheme/index";
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
  Search,
  ArrowDownward,
  Remove,
  ViewColumn,
} from "@mui/icons-material";
import MaterialTableComponent, { MaterialTableProps } from "material-table";
import { forwardRef } from "react";

const tableIcons: MaterialTableProps<{ title: string }>["icons"] = {
  Add: forwardRef((props, ref) => <AddRounded {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline color="error" {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit color="primary" {...props} ref={ref} />
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
};

export default function MaterialTable<T extends Object>(
  props: MaterialTableProps<T>
) {
  const theme = useTheme() as Theme;

  return (
    <MaterialTableComponent
      icons={tableIcons}
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
