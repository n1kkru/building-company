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

  let isMobile;
  if (window.screen.width <= 768) isMobile = true;
  else isMobile = false;

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
      <Link href="/" underline="none" color="inherit">
        <Typography sx={{ paddingInlineStart: 3 }} variant="h4" component="h1">
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
            sx={{ paddingInline: "30px 15px" }}
            fontSize={"22px"}
            color="#1a1a96"
            href="/objects"
            underline="hover"
            variant="body1"
            onClick={() => {
              <Navigate to="/objects" />;
            }}
          >
            Объекты
          </Link>
        )}
        {isAuth && isManager && (
          <Link
            href="/reports"
            sx={{ paddingInline: "15px" }}
            fontSize={"22px"}
            color="#1a1a96"
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
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "white",
                border: "2px solid #1a1a96",
              }}
              src="/builder.png"
            ></Avatar>
          </IconButton>
        )}
        {isAuth && !isMobile && name}
        {!isAuth && (
          <Button variant="text">
            <Link href="/login" underline="none" color="#1a1a96">
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
        <MenuItem onClick={handleClose}>
          <Avatar /> Профиль
        </MenuItem>

        <MenuItem onClick={handleUnAuth}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </header>
  );
}
