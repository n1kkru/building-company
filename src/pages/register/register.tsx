import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Typography } from "@mui/material";

import { useDispatch, useSelector } from "../../state/store";
import { registerUserThunk } from "../../state/userSlice";

import styles from "./register.module.css";
import { validationForm } from "../../utils/utils";

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

  useEffect(() => {
    if (
      validationForm({ name, email, password, passwordCheck, setErrorText })
    ) {
      buttonRef.current?.classList.remove("Mui-disabled");
      buttonRef.current?.removeAttribute("disabled");
    } else {
      buttonRef.current?.classList.add("Mui-disabled");
      buttonRef.current?.setAttribute("disabled", "true");
    }
  }, [name, email, password, passwordCheck]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUserThunk({ name, email, password, isManager: false })
    ).then(() => navigate("/login"));
  };

  return (
    <div>
      <Typography
        sx={{
          fontSize: "clamp(1.5625rem, 1.2946rem + 1.3393vw, 2.5rem)",
        }}
        component="h2"
      >
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
