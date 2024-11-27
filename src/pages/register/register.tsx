import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Typography } from "@mui/material";

import { useDispatch, useSelector } from "../../state/store";
import { registerUserThunk } from "../../state/userSlice";

import styles from "./register.module.css";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [errorText, setErrorText] = useState<string | null>(null);

  const isRegCheck = useSelector((state) => state.userReducers.isRegCheck);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const validationForm = (fields: {
    name: string;
    email: string;
    password: string;
    passwordCheck: string;
  }): boolean => {
    let valid = true;
    let regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (fields.email == "") {   
      valid = false;
    } 
    else if (!regex.test(fields.email)) {
      setErrorText("Введите корректный email");
      valid = false;
    } 
    else if (fields.password == "") {
      valid = false;
    } 
    else if (fields.passwordCheck == "") {
      valid = false;
    }
    else if (fields.password !== fields.passwordCheck) {
      setErrorText("Пароли не совпадают");
      valid = false;
    }
    return valid;
  };

  useEffect(() => {
    console.log(">>>", errorText);
    
    if (validationForm({ name, email, password, passwordCheck })) {
      buttonRef.current?.classList.remove("Mui-disabled");
      buttonRef.current?.removeAttribute("disabled");
      setErrorText(null);
    } else {
      buttonRef.current?.classList.add("Mui-disabled");
      buttonRef.current?.setAttribute("disabled", "true");
    }
  }, [name, email, password, passwordCheck]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUserThunk({ name, email, password })).then(() =>
      navigate("/login")
    );
  };

  return (
    <div>
      <Typography variant="h4" component="h2">
        Регистрация
      </Typography>
      <form className={styles.form} name="register" onSubmit={handleSubmit}>
        <Input
          sx={{ padding: 2, width: "90%" }}
          type="text"
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          size="medium"
        />
        <Input
          sx={{ padding: 2, width: "90%" }}
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"email"}
          size={"medium"}
        />
        <Input
          sx={{ padding: 2, width: "90%" }}
          type="password"
          name="password"
          placeholder="Пароль"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          size="medium"
        />
        <Input
          sx={{ padding: 2, width: "90%" }}
          type="password"
          name="password"
          placeholder="Повторите пароль"
          onChange={(e) => {
            setPasswordCheck(e.target.value);
          }}
          size="medium"
        />
        <Typography className={styles.error}>{errorText}</Typography>
        <Button
          ref={buttonRef}
          sx={{ marginBlockStart: "35px" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
};
