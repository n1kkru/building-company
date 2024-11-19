import { getObjectsApi } from "./api.ts";
import { TObject } from "./types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ObjectsStateInterface {
  isInit: boolean;
  isLoading: boolean;
  objects: TObject[];
  error: string | null;
}

export const initialState: ObjectsStateInterface = {
  isInit: false,
  isLoading: false,
  objects: [],
  error: "",
};

export const fetchGetObjects = createAsyncThunk(
  "objects/getObjects",
  async function () {
    const res = await getObjectsApi();
    return res;
  }
);

const objectsSlice = createSlice({
  name: "objects",
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    },
    addObjects: (state, action: PayloadAction<TObject>) => {
      state.objects.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetObjects.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchGetObjects.fulfilled, (state, action) => {
      state.isLoading = false;
      state.objects = action.payload;
    });
    builder.addCase(fetchGetObjects.rejected, (state, action) => {
      state.isLoading = false;
      state.error = String(action.error.message);
    });
  },
  selectors: {
    getIsLoading: (state) => state.isLoading,
  },
});

export const { getIsLoading } = objectsSlice.selectors;
export const { init, addObjects } = objectsSlice.actions;
export default objectsSlice.reducer;
