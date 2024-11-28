import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { TextField, Typography, Button, Autocomplete } from "@mui/material";

import {
  addDate,
  addEmail,
  addObject,
  addText,
  addTitle,
  fetchPostReport,
} from "../../state/reportsSlice";
import { useDispatch, useSelector } from "../../state/store";
import { TObject, TReport } from "../../utils/types";
import { fetchGetObjects, updateTotalReports } from "../../state/objectsSlice";

import styles from "./filling-report.module.css";
import { useNavigate } from "react-router-dom";

export const FillingReport = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetObjects());
  }, []);
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.userReducers.user?.email);

  const object = useSelector((state) => state.reportsReducers.formData.object);

  /* рефы */
  const buttonRef = useRef<HTMLButtonElement>(null);

  const objectsList: TObject[] = useSelector(
    (state) => state.objectReducers.objects
  );
  const formData: TReport = useSelector(
    (state) => state.reportsReducers.formData
  );
  const date = new Date();

  /* функция для подсветки пустых полей */
  const setError = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.children.item(0)?.classList.add("Mui-error");
    ref.current?.children.item(1)?.classList.add("Mui-error");
  };

  const validationForm = (fields: TReport): boolean => {
    let valid = true;
    if (fields.title == "") {
      valid = false;
    }
    if (fields.text == "") {
      valid = false;
    }
    if (fields.email == "") {
      valid = false;
    }
    if (fields.object === undefined) {
      valid = false;
    }

    return valid;
  };

  useEffect(() => {
    if (validationForm(formData)) {
      buttonRef.current?.classList.remove("Mui-disabled");
      buttonRef.current?.removeAttribute("disabled");
    } else {
      buttonRef.current?.classList.add("Mui-disabled");
      buttonRef.current?.setAttribute("disabled", "true");
    }
  }, [formData]);

  const onReportClick = () => {
    dispatch(fetchPostReport(formData));
    dispatch(updateTotalReports(object!));
  };

  const handlerAutocomplete = (e: SyntheticEvent) => {
    const index = e.currentTarget.textContent?.split(".")[0];
    dispatch(addObject(objectsList.find((obj) => obj.id == Number(index))));
  };

  return (
    <>
      <form className={styles.form}>
        <Typography variant="h4" component="h2" className={styles?.title}>
          Оставить заявку
        </Typography>
        <TextField
          maxRows={1}
          sx={{
            maxWidth: "550px",
            paddingBlockEnd: "15px",
            width: "90%",
            "& .MuiFormLabel-root": {
              color: "var(--text-color)",
            },
            "& #title-label": {
              color: "var(--text-color)",
            },
            "& .MuiInput-root::after": {
              "border-bottom" : "2px solid var(--decor-color)",
            },
          }}
          id="title"
          label="Название"
          variant="standard"
          onBlur={(e) => {
            dispatch(addTitle(e.target.value));
            dispatch(
              addDate(
                String(
                  `${date.getFullYear()}-${
                    date.getMonth() + 1
                  }-${date.getDate()}`
                )
              )
            );
          }}
        />
        <TextField
          sx={{
            maxWidth: "550px",
            paddingBlockEnd: "15px",
            width: "90%",
            "& .MuiFormLabel-root": {
              color: "var(--text-color)",
            },
            "& #text-label": {
              color: "var(--text-color)",
            },
            "& .MuiInput-root::after": {
              "border-bottom" : "2px solid var(--decor-color)",
            },
          }}
          id="text"
          label="Опишите проблему"
          variant="standard"
          multiline
          maxRows={6}
          onBlur={(e) => {
            dispatch(addText(e.target.value));
          }}
        />
        <TextField
          sx={{
            maxWidth: "550px",
            paddingBlockEnd: "15px",
            width: "90%",
            "& .MuiFormLabel-root": {
              color: "var(--text-color)",
            },
            "& #email-label": {
              color: "var(--text-color)",
            },
            "& .MuiInput-root::after": {
              "border-bottom" : "2px solid var(--decor-color)",
            },
          }}
          id="email"
          label="Email"
          variant="standard"
          defaultValue={userEmail && `${userEmail}`}
          onBlur={(e) => {
            dispatch(addEmail(e.target.value));
          }}
        />
        <Autocomplete
          sx={{
            maxWidth: "550px",
            paddingBlockEnd: "15px",
            width: "90%",
            "& .MuiFormLabel-root": {
              color: "var(--text-color)",
            },
            "& #title-label": {
              color: "var(--text-color)",
            },
            "&filedset": {
              "border-color" : "var(--decor-color)",
            },
          }}
          disablePortal
          options={objectsList.map(
            (obj, key) => `${key + 1}. ${obj.name}. ${obj.address}`
          )}
          onChange={handlerAutocomplete}
          renderInput={(params) => <TextField {...params} label="Объект" />}
        />
        <Button
          ref={buttonRef}
          sx={{ marginBlockStart: "35px", width: "50%",  background: "var(--button-color)" }}
          variant="contained"
          onClick={onReportClick}
        >
          Отправить
        </Button>
      </form>
    </>
  );
};
