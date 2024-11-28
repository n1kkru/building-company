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
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const autoRef = useRef<HTMLElement>(null);
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
      // setError(titleRef);
      valid = false;
    }
    if (fields.text == "") {
      // setError(textRef);
      valid = false;
    }
    if (fields.email == "") {
      // setError(emailRef);
      valid = false;
    }
    if (fields.object === undefined) {
      // autoRef.current?.children
      //   .item(0)
      //   ?.children.item(0)
      //   ?.classList.add("Mui-error");
      // autoRef.current?.children
      //   .item(0)
      //   ?.children.item(1)
      //   ?.classList.add("Mui-error");
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
          ref={titleRef}
          sx={{ maxWidth: "550px", paddingBlockEnd: "15px", width: "90%" }}
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
          ref={textRef}
          sx={{ maxWidth: "550px", paddingBlockEnd: "15px", width: "90%" }}
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
          ref={emailRef}
          sx={{ maxWidth: "550px", paddingBlockEnd: "15px", width: "90%" }}
          id="email"
          label="Email"
          variant="standard"
          defaultValue={userEmail && `${userEmail}`}
          onBlur={(e) => {
            dispatch(addEmail(e.target.value));
          }}
        />
        <Autocomplete
          ref={autoRef}
          sx={{ maxWidth: "550px", paddingBlockEnd: "15px", width: "90%" }}
          disablePortal
          options={objectsList.map(
            (obj, key) => `${key + 1}. ${obj.name}. ${obj.address}`
          )}
          onChange={handlerAutocomplete}
          renderInput={(params) => <TextField {...params} label="Объект" />}
        />
        <Button
          ref={buttonRef}
          sx={{ marginBlockStart: "35px", width: "50%" }}
          variant="contained"
          onClick={onReportClick}
        >
          Отправить
        </Button>
      </form>
    </>
  );
};
