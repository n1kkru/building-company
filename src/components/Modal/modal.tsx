import { FC, memo, ReactNode, useEffect, useRef, useState } from "react";
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
    dispatch(fetchPostObject({name, address, date}))
    onCloseModal()
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <Typography variant="h4" component="h2" className={styles.title}>
            {title}
          </Typography>
          <button
            className={styles.buttonClose}
            type="button"
            onClick={onCloseModal}
          >
            X
          </button>
        </div>
        <div className={styles.content}>
          <form className={styles.form}>
            <TextField
              sx={{ maxWidth: "550px", paddingBlockEnd: "15px", width: "90%" }}
              id="name"
              label="Название"
              variant="standard"
              maxRows={1}
              onBlur={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              sx={{ maxWidth: "550px", paddingBlockEnd: "15px", width: "90%" }}
              id="address"
              label="Адрес"
              variant="standard"
              onBlur={(e) => {
                setAddress(e.target.value);
              }}
            />
            <TextField
              sx={{ maxWidth: "550px", paddingBlockEnd: "15px", width: "90%" }}
              id="date"
              label="Дата"
              variant="standard"
              onBlur={(e) => {
                setDate(e.target.value)
              }}
            />
            <Button
              ref={buttonRef}
              type="submit"
              sx={{ marginBlockStart: "35px", width: "50%" }}
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
