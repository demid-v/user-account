import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AddContact from "../components/AddContact";
import Contact from "../components/Contact";
import {
  getContactsThunk,
  selectContacts,
} from "../features/contacts/contacts";
import { selectLogin } from "../features/login/login";
import "../styles/contacts.css";

function Contacts() {
  const { contacts } = useAppSelector(selectContacts);
  const { userId } = useAppSelector(selectLogin);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getContactsThunk(userId));
  }, [dispatch, userId]);

  return (
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
  );
}

export default Contacts;
