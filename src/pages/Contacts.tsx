import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AddContact from "../components/AddContact";
import Contact from "../components/Contact";
import Search from "../components/Search";
import {
  getContactsThunk,
  selectContacts,
} from "../features/contacts/contacts";
import { selectLogin } from "../features/login/login";
import "../styles/contacts.css";

function Contacts() {
  const { updateStatus, addStatus, deleteStatus, contacts } =
    useAppSelector(selectContacts);
  const { userId } = useAppSelector(selectLogin);

  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q"));

  useEffect(() => {
    setQuery(searchParams.get("q"));
  }, [searchParams]);

  function getContacts() {
    if (userId !== undefined) {
      dispatch(getContactsThunk({ userId, query }));
    }
  }

  useEffect(getContacts, [query]);

  useEffect(() => {
    if (
      updateStatus === "successful" ||
      addStatus === "successful" ||
      deleteStatus === "successful"
    ) {
      getContacts();
    }
  }, [addStatus, updateStatus, deleteStatus]);

  return (
    <main>
      <Search />
      <table className="contacts-table">
        <thead>
          <tr>
            <th></th>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {contacts?.map((contact, index) => (
            <Contact key={contact.id} index={index + 1} data={contact} />
          ))}
          <AddContact />
        </tbody>
      </table>
    </main>
  );
}

export default Contacts;
