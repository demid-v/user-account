import Contact from "../components/Contact";
import "../styles/contacts.css";

function Contacts() {
  const contactsElements = [];
  for (let i = 0; i < 3; i++) {
    contactsElements.push(<Contact key={i} index={i + 1} />);
  }

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
      <tbody>{contactsElements}</tbody>
    </table>
  );
}

export default Contacts;
