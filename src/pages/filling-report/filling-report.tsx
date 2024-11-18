import { TextField, Typography, Button, Autocomplete } from '@mui/material';
import React from 'react';
export const FillingReport = () => {

  return (
    <main className="main">
      <form className="form" >
        <Typography  variant='h4' component='h2'>Оставить заявку</Typography>
        <TextField sx={{width : '350px', paddingBlockEnd: '15px'}} id="title" label="Название" variant="standard" />
        <TextField sx={{width : '350px', paddingBlockEnd: '15px'}} id="text" label="Опишите проблему" variant="standard" multiline maxRows={6}/>
        <TextField sx={{width : '350px', paddingBlockEnd: '15px'}} id="email" label="Email" variant="standard" />
        <Autocomplete
          sx={{width : '350px', paddingBlock: '15px'}}
          disablePortal
          options={['Детский сад', 'Школа', 'Музей']}
          renderInput={(params) => <TextField {...params} label="Объект" />}
        />
        <Button sx={{marginBlockStart : '35px'}} variant="contained" disabled>Отправить</Button>
      </form>
    </main>
  );
};