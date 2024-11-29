import React, { useEffect } from "react";
import styles from './reports.module.css'
import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import {
  renderEditStatus,
  renderStatus,
  STATUS_OPTIONS,
} from "../../utils/status";
import { useDispatch, useSelector } from "../../state/store";
import { TReport } from "../../utils/types";
import { fetchGetReports } from "../../state/reportsSlice";

export const Reports = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetReports());
  }, []);

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
    <>
      <Typography variant="h4" component="h2">
        Заявки
      </Typography>
      <DataGrid
        className={styles.grid}
        sx={{ 
          maxHeight: "80vh", 
          maxWidth: "100%",
          borderRadius: "20px",
          borderColor: "var(--shadow-color)",
          "--DataGrid-containerBackground": "var(--bg-color)",
         }}
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
    </>
  );
};
