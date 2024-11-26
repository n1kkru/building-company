import { Button, Input, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { SyntheticEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUserThunk } from "../../state/userSlice";
import { useDispatch, useSelector } from "../../state/store";

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ariaLabel = { "aria-label": "description" };
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.userReducers.isAuthCheck);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserThunk({ email, password }));
  };

  return (
    <main className={"main"}>
      <div>
        <Typography variant="h4" component="h2">
          Вход
        </Typography>
        <form className={"form"} name="login">
          <Input
            sx={{ padding: 2, width: "90%" }}
            type="email"
            name="email"
            placeholder="E-mail"
            inputProps={ariaLabel}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            size="medium"
            onError={() => {}}
          />
          <Input
            sx={{ padding: 2, width: "90%" }}
            type="password"
            name="password"
            placeholder="Пароль"
            inputProps={ariaLabel}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            size="medium"
            onError={() => {}}
          />
          <Button
            sx={{ marginBlock: "35px", width: "90%" }}
            variant="contained"
            onClick={handleSubmit}
          >
            Войти
          </Button>
          {/* 
        {errorText && (
          <p >
            {errorText}
          </p>
        )} */}
          <Link to="/register">Зарегистрироваться</Link>
        </form>
      </div>
    </main>
  );
};
