import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { TObject } from "../../utils/types";
import { useSelector } from "../../state/store";

export const Objects = () => {
  const objectsList: TObject[] = useSelector(
    (state) => state.objectReducers.objects
  );
  // const isLoading : boolean = useSelector(getIsLoading)

  const mocky = [
    {
      id: 1,
      name: "Большая стройка",
      address: "Воронеж",
      date: "2023-05-12",
      total: 0,
    },
    {
      id: 2,
      name: "Детский сад",
      address: "Воронеж",
      date: "2023-07-15",
      total: 2,
    },
    {
      id: 3,
      name: "Школа",
      address: "Москва",
      date: "2023-09-20",
      total: 1,
    },
    {
      id: 4,
      name: "Рынок",
      address: "Тюмень",
      date: "2023-05-12",
      total: 2,
    },
    {
      id: 5,
      name: "ЖК Динамо",
      address: "Воркута",
      date: "2024-01-28",
      total: 0,
    },
    {
      id: 6,
      name: "Дом культуры",
      address: "село Попово",
      date: "2024-02-03",
      total: 0,
    },
    {
      id: 7,
      name: "Дом культуры",
      address: "село Сомово",
      date: "2024-03-03",
      total: 0,
    },
    {
      id: 8,
      name: "Дом культуры",
      address: "село Горячее",
      date: "2024-04-04",
      total: 0,
    },
    {
      id: 9,
      name: "Школа",
      address: "Пенза",
      date: "2024-05-11",
      total: 0,
    },
  ];

  const columns: GridColDef<(typeof objectsList)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Название",
      type: "string",
      width: 180,
    },
    {
      field: "address",
      type: "string",
      headerName: "Адрес",
      width: 180,
    },
    {
      field: "date",
      headerName: "Дата",
      type: "string",
      width: 120,
    },
    {
      field: "total",
      headerName: "Заявок",
      type: "number",
      width: 150,
    },
  ];

  return (
    <main className="main">
      <Typography variant="h4" component="h2">
        Объекты
      </Typography>
      <DataGrid
        sx={{ padding: 2, maxHeight: "80vh", maxWidth: "100%", border: "none" }}
        rows={objectsList}
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
