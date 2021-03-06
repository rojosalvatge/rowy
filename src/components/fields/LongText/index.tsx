import { lazy } from "react";
import { IFieldConfig, FieldType } from "components/fields/types";
import withBasicCell from "../_withTableCell/withBasicCell";

import LongTextIcon from "@mui/icons-material/Notes";
import BasicCell from "./BasicCell";
import TextEditor from "components/Table/editors/TextEditor";
import { filterOperators } from "../ShortText/Filter";

const SideDrawerField = lazy(
  () =>
    import(
      "./SideDrawerField" /* webpackChunkName: "SideDrawerField-LongText" */
    )
);

export const config: IFieldConfig = {
  type: FieldType.longText,
  name: "Long Text",
  group: "Text",
  dataType: "string",
  initialValue: "",
  initializable: true,
  icon: <LongTextIcon />,
  description: "Text displayed on multiple lines.",
  TableCell: withBasicCell(BasicCell),
  TableEditor: TextEditor,
  SideDrawerField,
  filter: {
    operators: filterOperators,
  },
};
export default config;
