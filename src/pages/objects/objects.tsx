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
      <Typography
        sx={{
          fontSize: "clamp(1.5625rem, 1.2946rem + 1.3393vw, 2.5rem)",
        }}
        component="h2"
        className={styles.title}
      >
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
        sx={{ color: "var(--button-color)" }}
        className={styles.button}
        onClick={handlerClick}
      >
        Создать объект
      </Button>
      {modalIsOpen && <Modal onClose={handlerClose} title={"Создать объект"} />}
    </>
  );
};
