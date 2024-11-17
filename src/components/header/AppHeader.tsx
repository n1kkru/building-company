import { Avatar, Box, Divider, IconButton, Link, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import React from 'react';
import './AppHeader.css'

export function AppHeader() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <header className="App-header">
        <Typography sx={{paddingInlineStart: 3}} variant="h4" component="h1">
          Строительная компания
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Link
            sx={{paddingInline: "15px"}}
            fontSize={"22px"}
            color='#1a1a96'
            component="button"
            underline="hover"
            variant="body1"
            onClick={() => {
              
            }}
          >
            Объекты
          </Link>
          <Link
            sx={{paddingInline: "15px"}}
            fontSize={"22px"}
            color='#1a1a96'
            component="button"
            underline="hover"
            variant="body1"
            onClick={() => {
              
            }}
          >
            Заявки
          </Link>
          <Tooltip title="Выйти">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: "white", border : "2px solid black"}} src="/builder.png"></Avatar>
            </IconButton>
          </Tooltip>
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
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar /> Профиль
          </MenuItem>
          
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </header>
      )
}