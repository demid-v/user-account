import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  getContacts,
  updateContact,
  addContact,
  deleteContact,
} from "../apis/contacts";

interface IContact {
  id: number;
  name: string;
  tel: string;
  email: string;
}

type TStatus = "idle" | "pending" | "successful" | "failed";

interface Contacts {
  getStatus: TStatus;
  updateStatus: TStatus;
  addStatus: TStatus;
  deleteStatus: TStatus;
  contacts?: IContact[];
}

const initialState: Contacts = {
  getStatus: "idle",
  updateStatus: "idle",
  addStatus: "idle",
  deleteStatus: "idle",
};

const getContactsThunk = createAsyncThunk(
  "contacts/getContacts",
  async ({ userId, query }: { userId: number; query?: string | null }) => {
    const response = await getContacts({ userId, query });
    const contacts = await response.json();

    return contacts;
  }
);

const updateContactThunk = createAsyncThunk(
  "contacts/editContact",
  async (contactData: {
    userId: number;
    contactId: number;
    name: string;
    tel: string;
    email: string;
  }) => {
    await updateContact(contactData);
  }
);

const addContactThunk = createAsyncThunk(
  "contacts/addContact",
  async (contactData: {
    userId: number;
    name: string;
    tel: string;
    email: string;
  }) => {
    await addContact(contactData);
  }
);

const deleteContactThunk = createAsyncThunk(
  "contacts/deleteContact",
  async ({ contactId }: { contactId: number; userId: number }) => {
    await deleteContact(contactId);
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getContactsThunk.pending, (state) => {
      state.getStatus = "pending";
    });
    builder.addCase(getContactsThunk.fulfilled, (state, action) => {
      state.getStatus = "successful";
      state.contacts = action.payload;
    });
    builder.addCase(getContactsThunk.rejected, (state) => {
      state.getStatus = "failed";
    });

    builder.addCase(updateContactThunk.pending, (state) => {
      state.updateStatus = "pending";
    });
    builder.addCase(updateContactThunk.fulfilled, (state) => {
      state.updateStatus = "successful";
    });
    builder.addCase(updateContactThunk.rejected, (state) => {
      state.updateStatus = "failed";
    });

    builder.addCase(addContactThunk.pending, (state) => {
      state.addStatus = "pending";
    });
    builder.addCase(addContactThunk.fulfilled, (state) => {
      state.addStatus = "successful";
    });
    builder.addCase(addContactThunk.rejected, (state) => {
      state.addStatus = "failed";
    });

    builder.addCase(deleteContactThunk.pending, (state) => {
      state.deleteStatus = "pending";
    });
    builder.addCase(deleteContactThunk.fulfilled, (state) => {
      state.deleteStatus = "successful";
    });
    builder.addCase(deleteContactThunk.rejected, (state) => {
      state.deleteStatus = "failed";
    });
  },
});

const selectContacts = (state: RootState) => state.contacts;

export default contactsSlice.reducer;
export type { IContact };
export {
  selectContacts,
  getContactsThunk,
  updateContactThunk,
  addContactThunk,
  deleteContactThunk,
};
