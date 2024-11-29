import { Button, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { TObject } from "../../utils/types";
import { useDispatch, useSelector } from "../../state/store";

import styles from "./objects.module.css";
import { useEffect, useState } from "react";
import { fetchGetObjects } from "../../state/objectsSlice";
import { Modal } from "../../components/Modal/modal";

export const Objects = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetObjects());
  }, []);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handlerClick = () => {
    setModalIsOpen(true);
  };
  const handlerClose = () => {
    setModalIsOpen(false);
  };

  const objectsList: TObject[] = useSelector(
    (state) => state.objectReducers.objects
  );

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
    { field: "id", headerName: "ID", width: 50 },
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
      width: 80,
    },
  ];

  return (
    <>
      <Typography variant="h4" component="h2" className={styles.title}>
        Объекты
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
        rows={objectsList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
      <Button
        sx={{color: "var(--button-color)"}}
        className={styles.button} 
        onClick={handlerClick}
        >
        Создать объект
      </Button>
      {modalIsOpen && <Modal onClose={handlerClose} title={"Создать объект"} />}
    </>
  );
};
