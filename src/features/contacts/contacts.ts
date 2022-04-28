import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { deleteContact, getContacts, editContact } from "../apis/contacts";

interface IContact {
  id: number;
  name: string;
  tel: string;
  email: string;
}

interface Contacts {
  status: "idle" | "pending" | "successful" | "failed";
  contacts?: IContact[];
}

const initialState: Contacts = { status: "idle" };

const getContactsCallBack = async (userId?: number) => {
  if (userId === undefined) {
    return [];
  }
  const response = await getContacts(userId);
  const contacts = await response.json();

  return contacts;
};

const getContactsThunk = createAsyncThunk(
  "contacts/getContacts",
  getContactsCallBack
);

const editContactThunk = createAsyncThunk(
  "contacts/editContact",
  async (contactData: {
    userId: number;
    contactId: number;
    name: string;
    tel: string;
    email: string;
  }) => {
    await editContact(contactData);

    // const contacts = await getContactsCallBack(contactData.userId);

    // const response = await getContacts(contactData.userId);
    // const contacts = await response.json();

    return await getContactsCallBack(contactData.userId);
  }
);

const deleteContactThunk = createAsyncThunk(
  "contacts/deleteContact",
  async ({ contactId, userId }: { contactId: number; userId: number }) => {
    await deleteContact(contactId);

    // const contacts = await getContactsCallBack(userId);

    // const response = await getContacts(userId);
    // const contacts = await response.json();

    return await getContactsCallBack(userId);
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

      state.contacts = action.payload;
    });
    builder.addCase(getContactsThunk.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(editContactThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(editContactThunk.fulfilled, (state, action) => {
      state.status = "successful";

      state.contacts = action.payload;
    });
    builder.addCase(editContactThunk.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(deleteContactThunk.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deleteContactThunk.fulfilled, (state, action) => {
      state.status = "successful";

      state.contacts = action.payload;
    });
    builder.addCase(deleteContactThunk.rejected, (state) => {
      state.status = "failed";
    });
  },
});

const selectContacts = (state: RootState) => state.contacts;

export default contactsSlice.reducer;
export type { IContact };
export {
  getContactsThunk,
  editContactThunk,
  deleteContactThunk,
  selectContacts,
};
