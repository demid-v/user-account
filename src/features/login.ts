import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { deleteCookie, getCookie, setCookie } from "../utils/cookie";
import { fetchUser } from "./loginAPI";

interface Login {
  loggedIn: boolean;
  userId?: number;
  status: "idle" | "pending" | "successful" | "failed";
}

const initialState: Login = {
  loggedIn: false,
  status: "idle",
};

const login = createAsyncThunk(
  "login/login",
  async (submittedData: { email: string; password: string }) => {
    const response = await fetchUser(submittedData);
    const data = await response.json();
    console.log(data);

    return data;
  }
);

const setCookieUserId = (userId: number) =>
  setCookie("userId", userId, 1000 * 60 * 60 * 24);
const getCookieUserId = () => getCookie("userId");
const deleteCookieUserId = () => deleteCookie("userId");

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.loggedIn = false;
      state.status = "idle";
      delete state.userId;

      deleteCookieUserId();
    },
    typing(state) {
      if (state.status === "failed") {
        state.status = "idle";
      }
    },
    setStateFromCookies(state) {
      let userId: number | string = getCookieUserId();
      if (userId !== "" && !Number.isNaN(userId)) {
        userId = Number(userId);
        state.loggedIn = true;
        state.userId = userId;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.length === 0) {
        state.status = "failed";
      } else {
        state.status = "successful";
        state.loggedIn = true;
        const userId = (state.userId = action.payload[0].id);

        setCookieUserId(userId);
      }
    });
    builder.addCase(login.rejected, (state) => {
      state.status = "failed";
    });
  },
});

const { logout, typing, setStateFromCookies } = loginSlice.actions;

const selectState = (state: RootState) => state.login;

export default loginSlice.reducer;
export { login, logout, typing, setStateFromCookies, selectState };
