import { ReactNode, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from "./modal.module.css";
import { Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "../../state/store";
import { fetchPostObject } from "../../state/objectsSlice";

const modalRoot = document.getElementById("modals");

export type TModalProps = {
  title: string;
  onClose?: () => void;
  children?: ReactNode;
};

export const Modal = ({ title, onClose, children }: TModalProps) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");

  const onCloseModal = () => {
    if (!onClose) {
      nav(-1);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === "Escape" && onCloseModal();
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handlerCreate = () => {
    dispatch(fetchPostObject({ name, address, date }));
    onCloseModal();
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <Typography variant="h4" component="h2" className={styles.title}>
            {title}
          </Typography>
          <Button
            className={styles.buttonClose}
            sx={{
              color: "var(--text-color)",
              width: "24px",
              height: "24px",
              padding: "0",
              "margin-left": "auto",
              border: "0.5px solid var(--shadow-color)",
            }}
            type="button"
            onClick={onCloseModal}
          >
            X
          </Button>
        </div>
        <div className={styles.content}>
          <form className={styles.form}>
            <TextField
              sx={{
                maxWidth: "550px",
                paddingBlockEnd: "15px",
                width: "90%",
                "& .MuiFormLabel-root": {
                  color: "var(--text-color)",
                },
                "& #name-label": {
                  color: "var(--text-color)",
                },
                "& .MuiInput-root::after": {
                  "border-bottom": "2px solid var(--decor-color)",
                },
              }}
              id="name"
              label="Название"
              variant="standard"
              maxRows={1}
              onBlur={(e) => {
                setName(e.target.value);
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
                "& #address-label": {
                  color: "var(--text-color)",
                },
                "& .MuiInput-root::after": {
                  "border-bottom": "2px solid var(--decor-color)",
                },
              }}
              id="address"
              label="Адрес"
              variant="standard"
              onBlur={(e) => {
                setAddress(e.target.value);
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
                "& #date-label": {
                  color: "var(--text-color)",
                },
                "& .MuiInput-root::after": {
                  "border-bottom": "2px solid var(--decor-color)",
                },
              }}
              id="date"
              label="Дата"
              variant="standard"
              onBlur={(e) => {
                setDate(e.target.value);
              }}
            />
            <Button
              ref={buttonRef}
              type="submit"
              sx={{
                marginBlockStart: "35px",
                width: "50%",
                background: "var(--button-color)",
              }}
              variant="contained"
              onClick={handlerCreate}
            >
              Создать
            </Button>
          </form>
        </div>
      </div>
    </>,
    modalRoot as HTMLDivElement
  );
};
