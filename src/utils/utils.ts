import { TReport } from "./types";

export let regForMail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type TValid = {
  name?: string;
  email: string;
  password: string;
  passwordCheck?: string;
  setErrorText(text: string): void;
};

export const validationForm = (fields: TValid): boolean => {
  let valid = true;
  fields.setErrorText("");
  if (fields.email == "") {
    valid = false;
  } else if (!regForMail.test(fields.email)) {
    fields.setErrorText("Введите корректный email");
    valid = false;
  } else if (fields.password == "") {
    valid = false;
  } else if (fields.passwordCheck == "") {
    valid = false;
  } else if (fields.passwordCheck && fields.password !== fields.passwordCheck) {
    fields.setErrorText("Пароли не совпадают");
    valid = false;
  }
  return valid;
};

  /* функция для подсветки пустых полей */
export const setError = (ref: React.RefObject<HTMLInputElement>) => {
  ref.current?.children.item(0)?.classList.add("Mui-error");
  ref.current?.children.item(1)?.classList.add("Mui-error");
};

type TValidReport = {
  fields: TReport,
  setErrorText(text: string): void;
};

export const validationReportForm = ( {fields, setErrorText} : TValidReport): boolean => {
  let valid = true;
  setErrorText("");
  if (fields.title == "") {
    valid = false;
  }
  else if (fields.text == "") {
    valid = false;
  }
  else if (fields.email == "") {
    valid = false;
  }
  else if (!regForMail.test(fields.email)) {
    setErrorText("Введите корректный email");
    valid = false;
  }
  else if (fields.object === undefined) {
    valid = false;
  }
  return valid;
};