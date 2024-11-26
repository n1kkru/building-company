import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Typography } from "@mui/material";

import { useDispatch, useSelector } from "../../state/store";
import { registerUserThunk } from "../../state/userSlice";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isRegCheck = useSelector((state) => state.userReducers.isRegCheck);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUserThunk({ name, email, password }));
    navigate("/login");
  };

  return (
    <main className={"main"}>
      <div>
        <Typography variant="h4" component="h2">
          Регистрация
        </Typography>
        <form className="form" name="register" onSubmit={handleSubmit}>
          <Input
            sx={{ padding: 2 }}
            type="text"
            placeholder="Имя"
            onChange={(e) => setName(e.target.value)}
            value={name}
            name="name"
            error={false}
            size="medium"
          />
          <Input
            sx={{ padding: 2 }}
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"email"}
            error={false}
            size={"medium"}
          />
          <Input
            sx={{ padding: 2 }}
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            size="medium"
            onError={() => {}}
          />
          <Button
            sx={{ marginBlockStart: "35px" }}
            variant="contained"
            onClick={handleSubmit}
          >
            Зарегистрироваться
          </Button>
          {/* {errorText && (
              <p className={`${styles.error} text text_type_main-default pb-6`}>
                {errorText}
              </p>
            )} */}
        </form>
      </div>
    </main>
  );
};
