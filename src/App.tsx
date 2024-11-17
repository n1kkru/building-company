import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppHeader } from './components/header/AppHeader.tsx';
       
function App() {
  return (
    <div className={"App"}>
      <AppHeader />
      <Routes>
        <Route path='/'/>
        <Route path='/login'/>
        <Route path='/register'/>
        <Route path='/objects'/>
        <Route path='/reports'/>
        <Route path='/filling-report'/>
      </Routes>
    </div>
  );
}

export default App;
