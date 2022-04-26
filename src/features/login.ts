import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
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

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.loggedIn = false;
      state.status = "idle";
      delete state.userId;
    },
    typing(state) {
      if (state.status === "failed") {
        state.status = "idle";
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
        state.userId = action.payload[0].id;
      }
    });
    builder.addCase(login.rejected, (state) => {
      state.status = "failed";
    });
  },
});

const { logout, typing } = loginSlice.actions;

const selectState = (state: RootState) => state.login;

export default loginSlice.reducer;
export { login, logout, typing, selectState };
