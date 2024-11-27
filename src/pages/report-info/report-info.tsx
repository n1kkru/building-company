import { Box, Typography } from "@mui/material";
import styles from "./report-info.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../state/store";
import { useEffect } from "react";
import { fetchGetReportById } from "../../state/reportsSlice";
import { Status } from "../../utils/status";

export const ReportInfo = () => {
  const dispatch = useDispatch();
  const { number } = useParams();
  useEffect(() => {
    dispatch(fetchGetReportById(Number(number)));
  }, []);

  const thisReport = useSelector((state) => state.reportsReducers.formData);

  return (
    <div className={styles.info}>
      <Typography variant="h3" component="h1" className={styles?.title}>
        {`Заявка #${number}. ${thisReport?.title}`}
      </Typography>
      <Typography variant="h5" component="p" className={styles?.text}>
        {thisReport?.text}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Typography variant="h5" component="p" className={styles?.description}>
          {`Заявитель: ${thisReport?.email}`}
        </Typography>
        <Typography  component="p" className={styles?.description}>
          {`Дата заявки: ${thisReport?.date}`}
        </Typography>
        <Typography component="p" className={styles?.description}>
          Статус: <Status status={thisReport.status} bigSize />
        </Typography>
        <Typography component="p" className={styles?.description}>
          {`Объект: ${thisReport.object?.name}`}
        </Typography>
        <Typography component="p" className={styles?.description}>
          {`Адрес: ${thisReport.object?.address}`}
        </Typography>
      </Box>
    </div>
  );
};
