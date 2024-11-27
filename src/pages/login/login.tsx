import { Button, Input, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { SyntheticEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import styles from './login.module.css'

import { loginUserThunk } from "../../state/userSlice";
import { useDispatch, useSelector } from "../../state/store";

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errorText = useSelector(state => state.userReducers.error);
  const ariaLabel = { "aria-label": "description" };
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.userReducers.isAuthCheck);

  /* рефы на поля */
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if(isAuth) navigate('/');
    if (validationForm({email, password})) {
      buttonRef.current?.classList.remove('Mui-disabled');
      buttonRef.current?.removeAttribute('disabled');
    }
    else {
      buttonRef.current?.classList.add('Mui-disabled');
      buttonRef.current?.setAttribute('disabled', 'true');
    }
  }, [isAuth, email, password])

  const validationForm = (fields : {email: string, password: string}) : boolean => {
    let valid = true;
    if (fields.email == "") {
      valid = false;
    }
    else if (fields.password == "") {
      valid = false;
    }
    return valid
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserThunk({ email, password }))
  };

  return (
    <>
      <Typography variant="h4" component="h2">
        Вход
      </Typography>
      <form className={styles.form} name="login">
        <Input
          required
          sx={{ padding: 2, width: "90%" }}
          type="email"
          name="email"
          placeholder="E-mail"
          inputProps={ariaLabel}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          size="medium"
        />
        <Input
          required
          sx={{ padding: 2, width: "90%" }}
          type="password"
          name="password"
          placeholder="Пароль"
          inputProps={ariaLabel}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          size="medium"
        />
        {errorText && (
          <Typography className={styles.error} >
            {errorText}
          </Typography>
        )}
        <Button
          ref={buttonRef}
          sx={{ marginBlock: "35px", width: "90%" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Войти
        </Button>

        <Link className={styles.link} to="/register">Зарегистрироваться</Link>
      </form>
    </>
  );
};
