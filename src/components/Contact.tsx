import pencilIcon from "../assets/icons/pencil.svg";
import deleteIcon from "../assets/icons/delete.png";
import checkIcon from "../assets/icons/check.png";
import cancelIcon from "../assets/icons/cancel.svg";
import {
  Contact as IContact,
  submitContactThunk,
} from "../features/contacts/contacts";
import { FormEvent, useState } from "react";
import { useAppDispatch } from "../app/hooks";

function Contact({
  index,
  data: { id, name, tel, email },
}: {
  index: number;
  data: IContact;
}) {
  const [editMode, setEditMode] = useState(false);

  const [localName, setLocalName] = useState(name);
  const [localTel, setLocalTel] = useState(tel);
  const [localEmail, setLocalEmail] = useState(email);

  function editContact() {
    setEditMode(true);
  }

  function exitEdittingMode() {
    setEditMode(false);

    setLocalName(name);
    setLocalTel(tel);
    setLocalEmail(email);
  }

  const dispatch = useAppDispatch();

  function submitChange() {
    exitEdittingMode();

    if (
      id !== undefined &&
      localName !== undefined &&
      localTel !== undefined &&
      localEmail !== undefined
    ) {
      dispatch(
        submitContactThunk({
          contactId: id,
          name: localName,
          tel: localTel,
          email: localEmail,
        })
      ).then(({ payload: { name, tel, email } }) => {
        setLocalName(name);
        setLocalTel(tel);
        setLocalEmail(email);
      });
    }
  }

  function handleNameChange(event: FormEvent) {
    setLocalName((event.target as HTMLInputElement).value);
  }

  function handleTelChange(event: FormEvent) {
    setLocalTel((event.target as HTMLInputElement).value);
  }

  function handleEmailChange(event: FormEvent) {
    setLocalEmail((event.target as HTMLInputElement).value);
  }

  return (
    <tr>
      <td>{index}</td>
      {editMode ? (
        <>
          <td>
            <input type="text" value={localName} onChange={handleNameChange} />
          </td>
          <td>
            <input type="text" value={localTel} onChange={handleTelChange} />
          </td>
          <td>
            <input
              type="text"
              value={localEmail}
              onChange={handleEmailChange}
            />
          </td>
        </>
      ) : (
        <>
          <td>{localName}</td>
          <td>{localTel}</td>
          <td>{localEmail}</td>
        </>
      )}
      <td>
        <div className="contacts-table-options">
          {editMode ? (
            <>
              <button title="Подтвердить" onClick={submitChange}>
                <img src={checkIcon} alt="Подтвердить" />
              </button>
              <button
                title="Отменить редактирование"
                onClick={exitEdittingMode}
              >
                <img src={cancelIcon} alt="Отменить редактирование" />
              </button>
            </>
          ) : (
            <button title="Редактировать" onClick={editContact}>
              <img src={pencilIcon} alt="Редактировать" />
            </button>
          )}
          <button title="Удалить">
            <img src={deleteIcon} alt="Удалить" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Contact;
