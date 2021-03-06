import { IHeavyCellProps } from "../types";

import { Tooltip, Stack, Avatar } from "@mui/material";

import { format } from "date-fns";
import { DATE_TIME_FORMAT } from "constants/dates";
import { useProjectContext } from "contexts/ProjectContext";

export default function CreatedBy({ row, column }: IHeavyCellProps) {
  const { table } = useProjectContext();
  const value = row[table?.auditFieldCreatedBy || "_createdBy"];

  if (!value || !value.displayName || !value.timestamp) return null;
  const dateLabel = format(
    value.timestamp.toDate ? value.timestamp.toDate() : value.timestamp,
    column.config?.format || DATE_TIME_FORMAT
  );

  return (
    <Tooltip title={`Created at ${dateLabel}`}>
      <Stack spacing={0.75} direction="row" alignItems="center">
        <Avatar
          alt="Avatar"
          src={value.photoURL}
          style={{ width: 20, height: 20 }}
        />
        <span>{value.displayName}</span>
      </Stack>
    </Tooltip>
  );
}
