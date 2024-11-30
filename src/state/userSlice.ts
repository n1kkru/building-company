import {
  TAuthResponse,
  TLoginData,
  getUserApi,
  loginUserApi,
  registerUserApi,
} from "../utils/api";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "../utils/types";

export const registerUserThunk = createAsyncThunk(
  "users/registerUser",
  async (data: TUser) => {
    const res = await registerUserApi(data);
    return res;
  }
);

export const loginUserThunk = createAsyncThunk(
  "users/loginUser",
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    localStorage.setItem("accessToken", res.token);
    return res;
  }
);

export const getUserThunk = createAsyncThunk(
  "users/getUser",
  async (_, { dispatch }) => {
    if (localStorage.getItem("accessToken")) {
      await getUserApi()
        .then((data) => {
          dispatch(setUser(data));
          dispatch(setAuthCkeck(true));

        })
        .catch((res) => {
          localStorage.removeItem("accessToken");
        });
    }
  }
);

export interface UserState {
  isRegCheck: boolean;
  isAuthCheck: boolean;
  isLoading: boolean;
  isManager: boolean;
  user: TUser | null;
  error: string | null;
}

const initialState: UserState = {
  isRegCheck: false,
  isAuthCheck: false,
  isLoading: true,
  isManager: false,
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthCkeck: (state, action: PayloadAction<boolean>) => {
      state.isAuthCheck = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state.user = null;
      state.isAuthCheck = false;
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
      state.isAuthCheck = false;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.isAuthCheck = false;  
      state.error = "Пользователь не найден"
      state.isLoading = false;
    });
    builder.addCase(
      loginUserThunk.fulfilled,
      (state, action: PayloadAction<TAuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.isAuthCheck = true;
        state.isManager = action.payload.data.isManager
      }
    );

    builder.addCase(registerUserThunk.pending, (state) => {
      state.isLoading = true;
      state.isRegCheck = false;
    });
    builder.addCase(registerUserThunk.rejected, (state) => {
      state.isLoading = false;
      state.isRegCheck = false;
    });
    builder.addCase(registerUserThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isRegCheck = true;
    });

    builder.addCase(getUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserThunk.fulfilled, (state) => {
      state.isLoading = false;
      // state.isManager = action.payload.data.isManager;
    });
  },
});

export const { setAuthCkeck, logout, setUser } = userSlice.actions;
export default userSlice.reducer;
