import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { AppHeader } from "./components/header/AppHeader.tsx";
import { FillingReport } from "./pages/filling-report/filling-report.tsx";
import { Login } from "./pages/login/login.tsx";
import { Reports } from "./pages/reports/reports.tsx";
import { Objects } from "./pages/objects/objects.tsx";

import { useDispatch, useSelector } from "./utils/store.ts";
import { fetchGetObjects, getIsLoading } from "./utils/objectsSlice.ts";
import { fetchGetReports } from "./utils/reportsSlice.ts";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetObjects());
    dispatch(fetchGetReports());
  }, []);

  return (
    <div className={"App"}>
      <div className="back" />
      <AppHeader />
      <Routes>
        <Route path="/" element={<FillingReport />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" />
        <Route path="/objects" element={<Objects />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/filling-report" />
      </Routes>
    </div>
  );
}

export default App;
