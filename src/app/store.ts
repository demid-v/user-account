import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import contactsReducer from "../features/contacts/contacts";
import loginReducer from "../features/login/login";

export const store = configureStore({
  reducer: { login: loginReducer, contacts: contactsReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
