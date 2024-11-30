import {
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "../../state/store";
import { logout, setAuthCkeck } from "../../state/userSlice";

import styles from "./AppHeader.module.css";

export function AppHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isAuth = useSelector((state) => state.userReducers.isAuthCheck);
  const isManager = useSelector((state) => state.userReducers.user?.isManager);
  const name = useSelector((state) => state.userReducers.user?.name);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleUnAuth = () => {
    dispatch(logout());
    dispatch(setAuthCkeck(false));
    navigate("/");
    handleClose();
  };

  return (
    <header className={styles.header}>
      <Link
        href="/"
        underline="none"
        color="var(--text-color)"
        className={styles.logo}
      >
        <Typography variant="h4" component="h1">
          Строительная компания
        </Typography>
      </Link>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "95vw",
          justifyContent: "space-evenly",
        }}
      >
        {isAuth && isManager && (
          <Link
            className={styles.link}
            fontSize="inherit"
            color="inherit"
            href="/objects"
            underline="hover"
            variant="body1"
          >
            Объекты
          </Link>
        )}
        {isAuth && isManager && (
          <Link
            className={styles.link}
            href="/reports"
            fontSize="inherit"
            color="inherit"
            underline="hover"
            variant="body1"
          >
            Заявки
          </Link>
        )}
        {isAuth && (
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "white",
                color: "var(--decor-color)",
                border: "2px solid var(--decor-color)"
              }}
              src="/builder.png"
            ></Avatar>
          </IconButton>
        )}
        {!isAuth && (
          <Button variant="text" sx={{color:"var(--button-color)"}}>
            <Link href="/login" underline="none" color="inherit"  >
              Войти
            </Link>
          </Button>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem className={styles.item} onClick={handleClose}>
          <Avatar src="/builder.png"/> {name}
        </MenuItem>

        <MenuItem onClick={handleUnAuth}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Выйти
        </MenuItem>
      </Menu>
    </header>
  );
}
