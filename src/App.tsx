import React from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppHeader } from './components/header/AppHeader.tsx';
import { FillingReport } from './pages/filling-report/filling-report.tsx';
import { Login } from './pages/login/login.tsx';
import { Reports } from './pages/reports/reports.tsx';
       
function App() {
  return (
    <div className={"App"}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<FillingReport/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register'/>
        <Route path='/objects'/>
        <Route path='/reports' element={<Reports/>}/>
        <Route path='/filling-report'/>
      </Routes>
    </div>
  );
}

export default App;
