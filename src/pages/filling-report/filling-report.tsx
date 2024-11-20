import { TextField, Typography, Button, Autocomplete } from "@mui/material";
import React, { useState } from "react";
import { addDate, addEmail, addText, addTitle, fetchPostReport } from "../../utils/reportsSlice.ts";
import { useDispatch, useSelector } from "../../utils/store.ts";
import { postReportApi } from "../../utils/api.ts";

export const FillingReport = () => {
  const dispatch = useDispatch();
  const [newReport, setNewReport] = useState();

  const onReportClick = () => {
    console.log("Click");
    
      const date = new Date();
      dispatch(addDate(String(date)))
      dispatch(fetchPostReport(
        {
          title: "Проблема",
          text: "большая проблема",
          email: "test@mail.ru",
          date: "2024-11-11",
          status: "Ожидает",
          objectName: "Rfdf",
        }
      ))
  }

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
            dispatch(addTitle(e.target.value));
          }}
        />
        <TextField
          sx={{ width: "350px", paddingBlockEnd: "15px" }}
          id="text"
          label="Опишите проблему"
          variant="standard"
          multiline
          maxRows={6}
          onChange={(e) => {
            dispatch(addText(e.target.value));
          }}
        />
        <TextField
          sx={{ width: "350px", paddingBlockEnd: "15px" }}
          id="email"
          label="Email"
          variant="standard"
          onChange={(e) => {
            dispatch(addEmail(e.target.value));
          }}
        />
        <Autocomplete
          sx={{ width: "350px", paddingBlock: "15px" }}
          disablePortal
          options={["Детский сад", "Школа", "Музей"]}
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
