import React from "react";

import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import {
  renderEditStatus,
  renderStatus,
  STATUS_OPTIONS,
} from "../../utils/status";
import { useSelector } from "../../state/store";
import { TReport } from "../../utils/types";

export const Reports = () => {
  const reportsList = useSelector((store) => store.reportsReducers.reports);
  const newReportsList = reportsList.map((rep : TReport) => { return {
      id: rep.id, 
      title: rep.title, 
      text: rep.text, 
      date: rep.date, 
      status: rep.status, 
      email: rep.email, 
      objectName: rep.object?.name 
    } 
  })

  const columns: GridColDef<(typeof newReportsList)[number]>[] = [
    { field: "id", headerName: "ID", width: 40 },
    {
      field: "title",
      headerName: "Название",
      width: 180,
    },
    {
      field: "text",
      headerName: "Текст",
      width: 450,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
    },
    {
      field: "date",
      headerName: "Дата",
      type: "string",
      width: 110,
    },
    {
      field: "status",
      headerName: "Статус",
      renderCell: renderStatus,
      renderEditCell: renderEditStatus,
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: STATUS_OPTIONS,
    },
    {
      field: "objectName",
      headerName: "Объект",
      type: "string",
      width: 120,
    },
  ];

  return (
    <main className="main">
      <Typography variant="h4" component="h2">
        Заявки
      </Typography>
      <DataGrid
        sx={{ padding: 2, maxHeight: "80vh", maxWidth: "100%", border: "none" }}
        rows={newReportsList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[8]}
        disableRowSelectionOnClick
      />
    </main>
  );
};
