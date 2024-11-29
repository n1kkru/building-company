import {
  getFilesApi,
  getReportByIdApi,
  getReportsApi,
  postFilesApi,
  postReportApi,
  updateReportStatusApi,
} from "../utils/api";
import {
  TFileResponse,
  TNewReport,
  TObject,
  TReport,
  TStatus,
} from "../utils/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ReportsStateInterface {
  isInit: boolean;
  isLoading: boolean;
  reportPage: TNewReport | null;
  reports: TReport[];
  formData: TReport;
  file: string;
  error: string | null;
}

export const initialState: ReportsStateInterface = {
  isInit: false,
  isLoading: false,
  reportPage: null,
  reports: [],
  formData: {
    id: 0,
    title: "",
    text: "",
    email: "",
    date: "",
    status: "Ожидает",
    object: undefined,
  },
  file: "",
  error: "",
};

export const fetchGetReports = createAsyncThunk(
  "reports/getReports",
  async function () {
    const res = await getReportsApi();
    return res;
  }
);

export const fetchGetReportById = createAsyncThunk(
  "reports/getReport",
  async function (number: number) {
    const res = await getReportByIdApi(number);
    return res;
  }
);

export const fetchGetFilesById = createAsyncThunk(
  "reports/getFiles",
  async function (id: number) {
    const res = await getFilesApi(id);
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

export const fetchPostFiles = createAsyncThunk(
  "reports/postFiles",
  async function (files: FileList) {
    const formData = new FormData();
    formData.append("file", files[0]);
    const res = await postFilesApi(formData);
    return res;
  }
);

export type TUpdateStatus = {
  id: number;
  status: TStatus;
};

export const updateReport = createAsyncThunk(
  "reports/updateReport",
  async function (data: TUpdateStatus) {
    const res = await updateReportStatusApi(data);
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
    },
    addDate: (state, action: PayloadAction<string>) => {
      state.formData.date = action.payload;
    },
    addObject: (state, action: PayloadAction<TObject | undefined>) => {
      state.formData.object = action?.payload;
    },
    addId: (state, action: PayloadAction<number>) => {
      state.formData.fileId = action?.payload;
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
      console.log(action.meta.arg);
    });
    builder.addCase(fetchPostReport.rejected, (state, action) => {
      state.isLoading = false;
      state.error = String(action.error.message);
    });

    builder.addCase(
      fetchGetReportById.fulfilled,
      (state, action: PayloadAction<TReport>) => {
        state.formData = action?.payload;
      }
    );

    builder.addCase(
      fetchPostFiles.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.formData.fileId = action?.payload.id;
      }
    );

    builder.addCase(fetchGetFilesById.fulfilled, (state, action) => {
      state.file = action.payload.url;
    });
  },
});

export const {
  init,
  addId,
  addReports,
  addTitle,
  addText,
  addDate,
  addEmail,
  addObject,
} = reportsSlice.actions;
export default reportsSlice.reducer;
