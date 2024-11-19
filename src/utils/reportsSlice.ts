import { getReportsApi } from "./api.ts";
import { TReport } from "./types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ReportsStateInterface {
  isInit: boolean;
  isLoading: boolean;
  reports: TReport[];
  error: string | null;
}

export const initialState: ReportsStateInterface = {
  isInit: false,
  isLoading: false,
  reports: [],
  error: "",
};

export const fetchGetReports = createAsyncThunk(
  "reports/getReports",
  async function () {
    const res = await getReportsApi();
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
  },
});

export const { init, addReports } = reportsSlice.actions;
export default reportsSlice.reducer;
