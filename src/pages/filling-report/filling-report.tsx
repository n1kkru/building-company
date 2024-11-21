import React, { useState } from "react";
import { TextField, Typography, Button, Autocomplete } from "@mui/material";

import { fetchPostReport } from "../../utils/reportsSlice.ts";
import { useDispatch, useSelector } from "../../utils/store.ts";

export const FillingReport = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [objectName, setObjectName] = useState<string>("");

  const objectsList: string[] = useSelector((state) =>
    state.objectReducers.objects
      .map((obj) => `${obj.name} - ${obj.address}`)
      .filter((item, i, ar) => ar.indexOf(item) === i)
  );

  const onReportClick = () => {
    const date = new Date();
    dispatch(
      fetchPostReport({
        title: title,
        text: text,
        email: email,
        date: String(
          `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        ),
        status: "Ожидает",
        objectName: objectName,
      })
    );
  };

  return (
    <main className="main">
      <form className="form">
        <Typography variant="h4" component="h2">
          Оставить заявку
        </Typography>
        <TextField
          sx={{ width: "350px", paddingBlockEnd: "15px" }}
          id="title"
          label="Название"
          variant="standard"
          onBlur={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          sx={{ width: "350px", paddingBlockEnd: "15px" }}
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
          sx={{ width: "350px", paddingBlockEnd: "15px" }}
          id="email"
          label="Email"
          variant="standard"
          onBlur={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Autocomplete
          sx={{ width: "350px", paddingBlock: "15px" }}
          disablePortal
          options={objectsList}
          onChange={(e) => {
            setObjectName(`${e.currentTarget.textContent}`);
          }}
          renderInput={(params) => <TextField {...params} label="Объект" />}
        />
        <Button
          sx={{ marginBlockStart: "35px" }}
          variant="contained"
          onClick={onReportClick}
        >
          Отправить
        </Button>
      </form>
    </main>
  );
};
