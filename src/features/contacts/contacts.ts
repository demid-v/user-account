import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getContacts, submitContact } from "../apis/contacts";

interface Contact {
  id?: number;
  name?: string;
  tel?: string;
  email?: string;
}

interface Contacts {
  status: "idle" | "pending" | "successful" | "failed";
  contacts?: Contact[];
}

const initialState: Contacts = { status: "idle" };

const getContactsThunk = createAsyncThunk(
  "contacts/getContacts",
  async (userId?: number) => {
    if (userId === undefined) {
      return [];
    }
    const response = await getContacts(userId);
    const contacts = await response.json();

    return contacts;
  }
);

const submitContactThunk = createAsyncThunk(
  "contacts/submitContact",
  async (contactData: {
    contactId: number;
    name: string;
    tel: string;
    email: string;
  }) => {
    const response = await submitContact(contactData);
    const contact = await response.json();

    return contact;
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getContactsThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getContactsThunk.fulfilled, (state, action) => {
      state.status = "successful";

      if (action.payload.length > 0) {
        state.contacts = action.payload;
      }
    });
    builder.addCase(getContactsThunk.rejected, (state) => {
      state.status = "failed";
    });
  },
});

const selectContacts = (state: RootState) => state.contacts;

export default contactsSlice.reducer;
export type { Contact };
export { getContactsThunk, selectContacts, submitContactThunk };
