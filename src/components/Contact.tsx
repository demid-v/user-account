import editIcon from "../assets/icons/pencil.svg";
import deleteIcon from "../assets/icons/cancel.svg";

function Contact({ index }: { index: number }) {
  return (
    <tr>
      <td>{index}</td>
      <td>Зыгарь Михаил</td>
      <td>89561232100</td>
      <td>rtyfgh@gmail.com</td>
      <td>
        <div className="contacts-table-options">
          <button>
            <img src={editIcon} alt="Edit" />
          </button>
          <button>
            <img src={deleteIcon} alt="Edit" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Contact;
