import * as React from "react";
import Chip from "@mui/material/Chip";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import type { MenuProps } from "@mui/material/Menu";
import Select, { SelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import {
  GridEditModes,
  GridRenderCellParams,
  GridRenderEditCellParams,
  useGridApiContext,
  useGridRootProps,
} from "@mui/x-data-grid";
import { useDispatch } from "../state/store";
import { updateReport } from "../state/reportsSlice";
import { TStatus } from "./types";

export const STATUS_OPTIONS = ["Готово", "Ожидает", "Отклонено"];

interface StatusProps {
  status: string;
  bigSize? : boolean;
}

const StyledChip = styled(Chip)(() => ({
  justifyContent: "left",
  "&.Готово": {
    color: "green",
    border: `1px solid green`,
  },
  "&.Ожидает": {
    color: "yellow",
    border: `1px solid yellow`,
  },
  "&.Отклонено": {
    color: "red",
    border: `1px solid red`,
  },
}));

export const Status = React.memo((props: StatusProps) => {
  const { status, bigSize } = props;

  let label: string = status;
  if (status === "Ожидает") {
    label = "Ожидает";
  }

  return (
    <StyledChip
      className={status}
      sx={bigSize ? {fontSize: "20px"} : {} }
      size={"small"}
      label={label}
      variant="outlined"
    />
  );
});

function EditStatus(props: GridRenderEditCellParams<any, string>) {
  const distpatch = useDispatch();
  const { id, value, field, row} = props;
  const rootProps = useGridRootProps();
  const apiRef = useGridApiContext();

  const handleChange: SelectProps["onChange"] = async (event) => {
    const isValid = await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });

    if (isValid && rootProps.editMode === GridEditModes.Cell) {
      apiRef.current.stopCellEditMode({ id, field, cellToFocusAfter: "below" });
      const thisRow = apiRef.current.getRow(id);
      console.log(">>> Изменен статус у элемента с ID:", event.target.value);
      distpatch(updateReport({
        id: thisRow.id,
        title: thisRow.title,
        text: thisRow.text,
        email: thisRow.email,
        status: event.target.value as TStatus,
        date: thisRow.date,
        object: thisRow.objectName
      }))
    }
  };

  const handleClose: MenuProps["onClose"] = (event, reason) => {
    if (reason === "backdropClick") {
      apiRef.current.stopCellEditMode({ id, field, ignoreModifications: true });
    }
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      MenuProps={{
        onClose: handleClose,
      }}
      sx={{
        height: "100%",
        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
          pl: 1,
        },
      }}
      autoFocus
      fullWidth
      open
    >
      {STATUS_OPTIONS.map((option) => {
        let label = option;
        if (option === "Ожидает") {
          label = "Ожидает";
        }

        return (
          <MenuItem key={option} value={option}>
            <ListItemText primary={label} sx={{ overflow: "hidden" }} />
          </MenuItem>
        );
      })}
    </Select>
  );
}

export function renderStatus(params: GridRenderCellParams<any, string>) {
  if (params.value == null) {
    return "";
  }

  return <Status status={params.value} />;
}

export function renderEditStatus(
  params: GridRenderEditCellParams<any, string>
) {
  return <EditStatus {...params} />;
}
