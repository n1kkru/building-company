import { useEffect } from "react";
import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";

import { AppHeader } from "../AppHeader";
import { FillingReport } from "../../pages/filling-report/filling-report";
import { Login } from "../../pages/login/login";
import { Reports } from "../../pages/reports/reports";
import { Objects } from "../../pages/objects/objects";
import { Register } from "../../pages/register/register";

import { useDispatch } from "../../state/store";
import { fetchGetObjects } from "../../state/objectsSlice";
import { fetchGetReports } from "../../state/reportsSlice";
import { getUserThunk } from "../../state/userSlice";
import { ReportInfo } from "../../pages/report-info/report-info";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGetObjects());
    dispatch(fetchGetReports());
    dispatch(getUserThunk());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<FillingReport />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/objects" element={<Objects />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/:number" element={<ReportInfo />} />
          <Route path="/filling-report" element={<FillingReport />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
