import React, { SyntheticEvent, useEffect, useState } from "react";
import { TextField, Typography, Button, Autocomplete } from "@mui/material";

import { fetchPostReport } from "../../state/reportsSlice";
import { useDispatch, useSelector } from "../../state/store";
import { TObject } from "../../utils/types";
import { updateTotalReports } from "../../state/objectsSlice";

import styles from './filling-report.module.css';

export const FillingReport = () => {
  const dispatch = useDispatch(); 
  const [title, setTitle] = useState<string>();
  const [text, setText] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [object, setObject] = useState<TObject>();

  const objectsList: TObject[] = useSelector((state) =>  state.objectReducers.objects);

  const onReportClick = () => {
    const date = new Date();
    if (title && text && email && object) {
      dispatch(
        fetchPostReport({
          title: title,
          text: text,
          email: email,
          date: String(
            `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          ),
          status: "Ожидает",
          object: object,
        })
      );
      dispatch(updateTotalReports(object));
    }
  };

  const handlerAutocomplete = (e: SyntheticEvent) => {
      const index = e.currentTarget.textContent?.split('.')[0];
      setObject(objectsList.find((obj) => obj.id == Number(index) ));
  }

  return (
    <main className="main">
      <form className="form">
        <Typography variant="h4" component="h2" className={styles?.title}>
          Оставить заявку
        </Typography>
        <TextField
          sx={{ maxWidth: "550px", paddingBlockEnd: "15px", width: "90%" }}
          id="title"
          label="Название"
          variant="standard"
          onBlur={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          sx={{ maxWidth: "550px", paddingBlockEnd: "15px", width: "90%" }}
          id="text"
          label="Опишите проблему"
          variant="standard"
          multiline
          maxRows={6}
          onBlur={(e) => {
            setText(e.target.value);
          }}
        />
        <TextField
          sx={{ maxWidth: "550px", paddingBlockEnd: "15px", width: "90%" }}
          id="email"
          label="Email"
          variant="standard"
          // defaultValue={`${userEmail}`}
          onBlur={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Autocomplete
          sx={{ maxWidth: "550px", paddingBlockEnd: "15px", width: "90%" }}
          disablePortal
          options={objectsList.map((obj, key) => `${key+1}. ${obj.name}. ${obj.address}`)}
          onChange={handlerAutocomplete}
          renderInput={(params) => <TextField {...params} label="Объект" />}
        />
        <Button
          sx={{ marginBlockStart: "35px", width: "50%" }}
          variant="contained"
          onClick={onReportClick}
        >
          Отправить
        </Button>
      </form>
    </main>
  );
};
