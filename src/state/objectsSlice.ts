import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getObjectsApi, postObjectApi, updateObjectTotalApi } from "../utils/api";
import { TNewObject, TObject } from "../utils/types";

export interface ObjectsStateInterface {
  isInit: boolean;
  isLoading: boolean;
  objects: TObject[];
  newObject: TNewObject | null;
  error: string | null;
}

export const initialState: ObjectsStateInterface = {
  isInit: false,
  isLoading: false,
  objects: [],
  newObject: null,
  error: "",
};

export const fetchGetObjects = createAsyncThunk(
  "objects/getObjects",
  async function () {
    const res = await getObjectsApi();
    return res;
  }
);

export const fetchPostObject = createAsyncThunk(
  "objects/postObject",
  async function (object: TNewObject) {
    const res = await postObjectApi(object);
    return res;
  }
);

export const updateTotalReports = createAsyncThunk(
  "objects/updateTotal",
  async function (object: TObject) {
    const res = await updateObjectTotalApi(object);
    return res;
  }
)

const objectsSlice = createSlice({
  name: "objects",
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    },
    addObjects: (state, action: PayloadAction<TObject>) => {
      state.objects.push(action.payload);
    }
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
  }
});

export const { init, addObjects } = objectsSlice.actions;
export default objectsSlice.reducer;
