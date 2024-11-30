import React, {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { TextField, Typography, Button, Autocomplete } from "@mui/material";

import {
  addDate,
  addEmail,
  addObject,
  addText,
  addTitle,
  fetchPostFiles,
  fetchPostReport,
} from "../../state/reportsSlice";
import { useDispatch, useSelector } from "../../state/store";
import { TObject, TReport } from "../../utils/types";
import { fetchGetObjects, updateTotalReports } from "../../state/objectsSlice";

import styles from "./filling-report.module.css";
import { useNavigate } from "react-router-dom";
import { validationReportForm } from "../../utils/utils";
import InputFileUpload from "../../components/InputFileUpload/input-file-upload";

export const FillingReport = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetObjects());
  }, []);
  const navigate = useNavigate();

  const userEmail = useSelector((state) => state.userReducers.user?.email);
  const object = useSelector((state) => state.reportsReducers.formData.object);
  const isPost = useSelector((state) => state.reportsReducers.isPost);
  const reportPage = useSelector((state) => state.reportsReducers.reportPage);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [files, setFiles] = React.useState<FileList | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const objectsList: TObject[] = useSelector(
    (state) => state.objectReducers.objects
  );
  const formData: TReport = useSelector(
    (state) => state.reportsReducers.formData
  );
  const date = new Date();

  useEffect(() => {
    if (validationReportForm({ fields: formData, setErrorText })) {
      buttonRef.current?.classList.remove("Mui-disabled");
      buttonRef.current?.removeAttribute("disabled");
    } else {
      buttonRef.current?.classList.add("Mui-disabled");
      buttonRef.current?.setAttribute("disabled", "true");
    }
  }, [formData]);

  useEffect(() => {
    /* после отправки заявки перенаправляем на страницу  */
    const pageid: string = String(reportPage?.id);
    if (isPost) navigate(`reports/${pageid}`);
  }, [isPost]);

  const onReportClick = () => {
    if (files) {
      dispatch(fetchPostFiles(files)).then((res) => {
        dispatch(fetchPostReport({ ...formData, fileId: res.payload?.id }));
      });
    } else {
      dispatch(fetchPostReport(formData));
    }
    dispatch(updateTotalReports(object!));
  };

  const handlerAutocomplete = (e: SyntheticEvent) => {
    const index = e.currentTarget.textContent?.split(".")[0];
    dispatch(addObject(objectsList.find((obj) => obj.id == Number(index))));
  };

  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  return (
    <>
      <form className={styles.form}>
        <Typography
          sx={{
            fontSize: "clamp(1.5625rem, 1.2946rem + 1.3393vw, 2.5rem)",
          }}
          component="h2"
          className={styles?.title}
        >
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
              borderBottom: "2px solid var(--decor-color)",
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
              borderBottom: "2px solid var(--decor-color)",
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
              borderBottom: "2px solid var(--decor-color)",
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
            border: "none",
            color: "none",
            width: "90%",
            "& .MuiFormLabel-root": {
              color: "var(--text-color)",
            },
            "& #title-label": {
              color: "var(--text-color)",
            },
            "& .MuiOutlinedInput-notchedOutline.Mui-selected": {
              borderColor: "var(--decor-color)",
            },
          }}
          disablePortal
          options={objectsList.map(
            (obj, key) => `${key + 1}. ${obj.name}. ${obj.address}`
          )}
          onChange={handlerAutocomplete}
          renderInput={(params) => <TextField {...params} label="Объект" />}
        />
        <InputFileUpload files={files} onChange={uploadFile} />
        <Typography className={styles.error}>{errorText}</Typography>
        <Button
          ref={buttonRef}
          sx={{
            marginBlockStart: "15px",
            width: "50%",
            background: "var(--button-color)",
          }}
          variant="contained"
          onClick={onReportClick}
        >
          Отправить
        </Button>
      </form>
    </>
  );
};
