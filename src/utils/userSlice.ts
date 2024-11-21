import { TAuthResponse, TLoginData, getUserApi, loginUserApi, logoutApi, registerUserApi } from "./api.ts";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "./types";

export const registerUserThunk = createAsyncThunk(
  'users/registerUser',
  async (data: TUser) => {
    const res = await registerUserApi(data);
    return res
  }
)

export const loginUserThunk = createAsyncThunk(
  'users/loginUser',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    localStorage.setItem('accessToken', res.token);
    return res
  }
)

export const logoutUserThunk = createAsyncThunk(
  'users/logoutUser',
  async () => {
    const res = await logoutApi()
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    return res;
  }
)


// export const getUserThunk = createAsyncThunk(
//     'users/getUser',
//     async (_, {dispatch}) => {
//       if (localStorage.getItem('accessToken')) {
//         await getUserApi()
//           .then(res => dispatch(setUser(res)) )
//           .catch(() => {
//             localStorage.removeItem('refreshToken');
//             localStorage.removeItem('accessToken');
//           })
//           .finally(() => dispatch(setAuthCkeck(true)))
//       } else {
//         dispatch(setAuthCkeck(true));
//       }
//     }
// )

export interface UserState {
  isRegCheck: boolean;
  isAuthCheck: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | null;
}

const initialState: UserState = {
  isRegCheck: false,
  isAuthCheck: false,
  isLoading: false,
  user: null,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      setAuthCkeck: (state, action: PayloadAction<boolean>) => {
        state.isAuthCheck = action.payload;
      },
      logout: (state) => {
        state.user = null;
      },
      setUser: (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
      }
  },
  extraReducers: (builder) => {
      builder.addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(loginUserThunk.rejected, (state) => {
        state.isLoading = false;
      });
      builder.addCase(loginUserThunk.fulfilled, (state, action : PayloadAction<TAuthResponse>) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.isAuthCheck = true;        
      });

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

      // builder.addCase(getUserThunk.pending, (state) => {
      //   state.isAuthCheck = false;
      //   state.isLoading = true;
      // });
      // builder.addCase(getUserThunk.rejected, (state) => {
      //     state.isAuthCheck = false;
      //     state.isLoading = false;
      // });
      // builder.addCase(getUserThunk.fulfilled, (state) => {
      //     state.isAuthCheck = true;
      //     state.isLoading = false;
      // });

      builder.addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
    });
  }
});

export const { setAuthCkeck, logout, setUser } = userSlice.actions;
export default userSlice.reducer