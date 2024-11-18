import { Button, Input, Typography } from '@mui/material';
import React from 'react';
import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { loginUserThunk } from '../../services/userSlice';
import { Navigate, useLocation , Link} from 'react-router-dom';

export const Login = () => {
  // const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const ariaLabel = { 'aria-label': 'description' };

  const handleSubmit = (e: SyntheticEvent) => {
    
    e.preventDefault();
    // dispatch(loginUserThunk({email, password}));
    const { from } = location.state || {from : {pathname: "/"}};
    return <Navigate to={from}/>
  };

  return (
  <main className={"main"}>
    <div>
      <Typography variant='h4' component="h2">Вход</Typography>
      <form
        className={"form"}
        name='login'
        onSubmit={handleSubmit}
      >
        
        <Input 
          type='email'
          name='email'
          placeholder="E-mail" 
          inputProps={ariaLabel} 
          onChange={(e) => {setEmail(e.target.value)}}
          size='medium'
          error
          onError={()=>{}}
        />
        <Input 
          type='password'
          name='password'
          placeholder="Пароль" 
          inputProps={ariaLabel} 
          onChange={(e) => {setPassword(e.target.value)}}
          size='medium'
          error
          onError={()=>{}}
        />
        <Button sx={{marginBlockStart : '35px'}} variant="contained" disabled>Отправить</Button>
{/* 
        {errorText && (
          <p >
            {errorText}
          </p>
        )} */}
      </form>
      <div>
        Вы - новый пользователь?
        <Link to='/register'>
          Зарегистрироваться
        </Link>
      </div>
    </div>
  </main>
  )}