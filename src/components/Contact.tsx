import pencilIcon from "../assets/icons/pencil.svg";
import deleteIcon from "../assets/icons/delete.png";
import checkIcon from "../assets/icons/check.png";
import cancelIcon from "../assets/icons/cancel.svg";
import {
  IContact,
  deleteContactThunk,
  editContactThunk,
} from "../features/contacts/contacts";
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectLogin } from "../features/login/login";

function Contact({
  index,
  data: { id, name, tel, email },
}: {
  index: number;
  data: IContact;
}) {
  const [editMode, setEditMode] = useState(false);

  const [localName, setLocalName] = useState("");
  const [localTel, setLocalTel] = useState("");
  const [localEmail, setLocalEmail] = useState("");

  useEffect(() => {
    setLocalName(name);
  }, [name]);

  useEffect(() => {
    setLocalTel(tel);
  }, [tel]);

  useEffect(() => {
    setLocalEmail(email);
  }, [email]);

  function turnOnEditMode() {
    setEditMode(true);
  }

  function exitEditMode() {
    setEditMode(false);

    setLocalName(name);
    setLocalTel(tel);
    setLocalEmail(email);
  }

  const dispatch = useAppDispatch();

  const { userId } = useAppSelector(selectLogin);

  function editContact() {
    exitEditMode();

    if (
      userId !== undefined &&
      id !== undefined &&
      localName !== undefined &&
      localTel !== undefined &&
      localEmail !== undefined
    ) {
      dispatch(
        editContactThunk({
          userId,
          contactId: id,
          name: localName,
          tel: localTel,
          email: localEmail,
        })
      );
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

  function deleteContact() {
    if (id !== undefined && userId !== undefined) {
      dispatch(deleteContactThunk({ contactId: id, userId }));
    }
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
          <td>{name}</td>
          <td>{tel}</td>
          <td>{email}</td>
        </>
      )}
      <td>
        <div className="contacts-table-options">
          <button title="Удалить" onClick={deleteContact}>
            <img src={deleteIcon} alt="" />
          </button>
          {editMode ? (
            <>
              <button title="Подтвердить" onClick={editContact}>
                <img src={checkIcon} alt="" />
              </button>
              <button title="Отменить редактирование" onClick={exitEditMode}>
                <img src={cancelIcon} alt="" />
              </button>
            </>
          ) : (
            <button title="Редактировать" onClick={turnOnEditMode}>
              <img src={pencilIcon} alt="" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

export default Contact;
