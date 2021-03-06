import { useWatch } from "react-hook-form";
import { ISideDrawerFieldProps } from "../types";

import { useFieldStyles } from "components/SideDrawer/Form/utils";

import { format } from "date-fns";
import { DATE_TIME_FORMAT } from "constants/dates";
import { useProjectContext } from "contexts/ProjectContext";

export default function UpdatedAt({ control, column }: ISideDrawerFieldProps) {
  const fieldClasses = useFieldStyles();

  const { table } = useProjectContext();
  const value = useWatch({
    control,
    name: table?.auditFieldUpdatedBy || "_updatedBy",
  });

  if (!value || !value.timestamp) return <div className={fieldClasses.root} />;

  const dateLabel = format(
    value.timestamp.toDate ? value.timestamp.toDate() : value.timestamp,
    column.config?.format || DATE_TIME_FORMAT
  );

  return (
    <div
      className={fieldClasses.root}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {dateLabel}
    </div>
  );
}
