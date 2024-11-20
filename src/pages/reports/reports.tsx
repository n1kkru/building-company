import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { TReport } from "../../utils/types.ts";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  renderEditStatus,
  renderStatus,
  STATUS_OPTIONS,
} from "../../utils/status.tsx";
import { useDispatch, useSelector } from "../../utils/store.ts";
import { fetchGetReports } from "../../utils/reportsSlice.ts";

type reportsProps = {
  reports: TReport[];
};

export const Reports = () => {
  const dispatch = useDispatch();

  const title = useSelector(state => state.reportsReducers.formData)
  useEffect(() => {
    dispatch(fetchGetReports());   
  }, []);
  const reportsList = useSelector((store) => store.reportsReducers.reports);

  const mocky = [
    {
      id: 1,
      title: "Дырка в стене",
      text: "Обнаружена дыра в восточной стене",
      email: "test@mail.ru",
      date: "2024-01-01",
      status: "Готово",
      object: "Детский сад",
    },
    {
      id: 2,
      title: "Дырка в стене",
      text: "Обнаружена дыра в восточной стене",
      email: "keks@mail.ru",
      date: "2024-01-05",
      status: "Готово",
      object: "Детский сад",
    },
    {
      id: 3,
      title: "Нет душа в раздевалке",
      text: "В мужской раздевалке нет душа!",
      email: "shkololo@mail.ru",
      date: "2024-02-22",
      status: "Отклонено",
      object: "Школа",
    },
    {
      id: 4,
      title: "Входная дверь",
      text: "При входе в здание рынка плохо открывается дверь",
      email: "madam@mail.ru",
      date: "2024-05-17",
      status: "Готово",
      object: "Рынок",
    },
    {
      id: 5,
      title: "Входная дверь",
      text: "При входе в здание рынка не открывается дверь",
      email: "madam@mail.ru",
      date: "2024-05-17",
      status: "Ожидает",
      object: "Рынок",
    },
  ];

  const columns: GridColDef<(typeof reportsList)[number]>[] = [
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
        rows={reportsList}
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
