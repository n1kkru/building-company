import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { AppHeader } from "./components/header/AppHeader.tsx";
import { FillingReport } from "./pages/filling-report/filling-report.tsx";
import { Login } from "./pages/login/login.tsx";
import { Reports } from "./pages/reports/reports.tsx";
import { Objects } from "./pages/objects/objects.tsx";

import { useDispatch } from "./state/store.ts";
import { fetchGetObjects } from "./state/objectsSlice.ts";
import { fetchGetReports } from "./state/reportsSlice.ts";
import { Register } from "./pages/register/register.tsx";
import { getUserThunk } from "./state/userSlice.ts";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetObjects());
    dispatch(fetchGetReports());
    dispatch(getUserThunk());
  }, []);

  return (
    <div className={"App"}>
      <div className="back" />
      <AppHeader />
      <Routes>
        <Route path="/" element={<FillingReport />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/objects" element={<Objects />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/filling-report" />
      </Routes>
    </div>
  );
}

export default App;
