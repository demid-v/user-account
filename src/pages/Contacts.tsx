import { useAppSelector } from "../app/hooks";
import AddContact from "../components/AddContact";
import Contact from "../components/Contact";
import Search from "../components/Search";
import { selectContacts } from "../features/contacts/contacts";
import "../styles/contacts.css";

function Contacts() {
  const { contacts } = useAppSelector(selectContacts);

  return (
    <>
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
    </>
  );
}

export default Contacts;
