import { getReportsApi, postReportApi, updateReportStatusApi } from "../utils/api";
import { TNewReport, TObject, TReport, TStatus } from "../utils/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ReportsStateInterface {
  isInit: boolean;
  isLoading: boolean;
  reports: TReport[];
  formData: TReport;
  error: string | null;
}

export const initialState: ReportsStateInterface = {
  isInit: false,
  isLoading: false,
  reports: [],
  formData: {
    id: 0,
    title: "",
    text: "",
    email: "",
    date: "",
    status: "Ожидает",
    object: {
      id: 0,
      address: "",
      name: "",
      date: "",
      total: 0,
    }
  },
  error: "",
};

export const fetchGetReports = createAsyncThunk(
  "reports/getReports",
  async function () {
    const res = await getReportsApi();
    return res;
  }
);

export const fetchPostReport = createAsyncThunk(
  "reports/postReport",
  async function (report: TNewReport) {
    const res = await postReportApi(report);
    return res;
  }
);

export const updateReport = createAsyncThunk(
  "reports/updateReport",
  async function (report: TReport) {
    console.log(report);
        
    const res = await updateReportStatusApi(report);
    return res;
  }
);


const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    },
    addReports: (state, action: PayloadAction<TReport>) => {
      state.reports.push(action.payload);
    },
    addTitle: (state, action: PayloadAction<string>) => {
      state.formData.title = action.payload;
    },
    addText: (state, action: PayloadAction<string>) => {
      state.formData.text = action.payload;
    },
    addEmail: (state, action: PayloadAction<string>) => {
      state.formData.email = action.payload;
      console.log(state.formData.title);
    },
    addDate: (state, action: PayloadAction<string>) => {
      state.formData.date = action.payload;
    },
    changeStatus: (state, action: PayloadAction<TStatus>) => {},
    addObject: (state, action: PayloadAction<TObject>) => {
      state.formData.object = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetReports.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchGetReports.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reports = action.payload;
    });
    builder.addCase(fetchGetReports.rejected, (state, action) => {
      state.isLoading = false;
      state.error = String(action.error.message);
    });

    builder.addCase(fetchPostReport.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPostReport.fulfilled, (state, action) => {
      // state.isLoading = false;
      // state.reportPage = action.payload  /* сохранять данные для страницы */
    });
    builder.addCase(fetchPostReport.rejected, (state, action) => {
      state.isLoading = false;
      state.error = String(action.error.message);
    });
  },
});

export const {
  init,
  addReports,
  addTitle,
  addText,
  addDate,
  addEmail,
  addObject,
} = reportsSlice.actions;
export default reportsSlice.reducer;
